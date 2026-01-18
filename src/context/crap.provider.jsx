import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth.context.jsx";

const CrapContext = createContext();

function CrapProvider({ children }) {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [allData, setAllData] = useState([]);
  const [mineData, setMineData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myCrapList, setMyCrapList] = useState({});
  const [hasSearch, setSearch] = useState(false);

  const BASE_URL = import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://w2025-final-backend-58fl.onrender.com";

  // Search Crap (all, or by query)
  function fetchAllCrap() {
    if (!token) return;
    setLoading(true);
    fetch(query ? `${BASE_URL}/api/crap/?q=${query}` : `${BASE_URL}/api/crap`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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

  // Fetch my crap (mine)
  function fetchMineCrap() {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/crap/mine`, {
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

  // Fetch crap  by id
  function fetchCrapById(id) {
    if (!token) return;
    setLoading(true);
    fetch(`${BASE_URL}/api/crap/${id}`, {
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
    fetch(`${BASE_URL}/api/crap/${id}/${action}`, {
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
        fetchCrapById(id);
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

  // Creates section for my crap page
  function createSections(arr) {
    let section = arr.reduce((existing, crap) => {
      if (crap.status in existing) {
        existing[crap.status].push(crap);
      } else {
        existing[crap.status] = [crap];
      }
      return existing;
    }, {});
    setMyCrapList(section);
  }

  const value = {
    mineData,
    allData,
    loading,
    error,
    singleData,
    myCrapList,
    hasSearch,
    fetchAllCrap,
    fetchMineCrap,
    fetchCrapById,
    updateQuery,
    createSections,
    sendPostData,
  };
  return <CrapContext.Provider value={value}>{children}</CrapContext.Provider>;
}

function useCrap() {
  const context = useContext(CrapContext);
  if (!context) throw new Error("Hook being used outside of Provider");

  return context;
}
export { useCrap, CrapProvider };
