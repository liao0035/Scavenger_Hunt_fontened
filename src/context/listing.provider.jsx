import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth.context.jsx";

const ListingContext = createContext();

function ListingProvider({ children }) {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [mineData, setMineData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myListingList, setMyListingList] = useState({});
  const [hasSearch, setSearch] = useState(false);

  const BASE_URL = import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://scavenger-hunt-backend-r6iw.onrender.com";

  // Search Listing (all, or by query)
  function fetchAllListing() {
    if (!token) return;
    setLoading(true);
    fetch(
      query ? `${BASE_URL}/api/listing/?q=${query}` : `${BASE_URL}/api/listing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Oops! Something bad happened!: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log("Search results", res.data);
        setAllData(res.data);
        setSearch(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch request failed.", err);
        setError(err);
        setLoading(false);
      });
  }

  // Fetch my listing (mine)
  function fetchMineListing() {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/listing/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch request failed.");
        return res.json();
      })
      .then((res) => {
        setMineData(res.data);
        createSections(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch request failed.", err);
        setError(err);
        setLoading(false);
      });
  }

  // Fetch listing  by id
  function fetchListingById(id) {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/listing/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch request failed.");
        return res.json();
      })
      .then((res) => {
        setSingleData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  // Fetch for buyer/seller flow
  function sendPostData(id, formData, action) {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/listing/${id}/${action}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit suggestion");
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setSingleData(res.data);
        fetchListingById(id);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }

  // Used in our search form, takes in user query
  // query is then passed into our fetch function
  function updateQuery(newQuery) {
    setQuery(newQuery);
  }

  // Creates section for my listing page
  function createSections(arr) {
    let section = arr.reduce((existing, listing) => {
      if (listing.status in existing) {
        existing[listing.status].push(listing);
      } else {
        existing[listing.status] = [listing];
      }
      return existing;
    }, {});
    setMyListingList(section);
  }

  const value = {
    mineData,
    allData,
    loading,
    error,
    singleData,
    myListingList,
    hasSearch,
    fetchAllListing,
    fetchMineListing,
    fetchListingById,
    updateQuery,
    createSections,
    sendPostData,
  };
  return (
    <ListingContext.Provider value={value}>{children}</ListingContext.Provider>
  );
}

function useListing() {
  const context = useContext(ListingContext);
  if (!context) throw new Error("Hook being used outside of Provider");

  return context;
}
export { useListing, ListingProvider };
