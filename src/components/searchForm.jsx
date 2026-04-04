import { useEffect } from "react";
import styles from "./searchForm.module.css";
// Context
import { useListing } from "../context/listing.provider.jsx";
import { useAuth } from "../context/auth.context";
// icon
import { FiSearch } from "react-icons/fi";

/** Search form component */
export default function SearchForm() {
  const { fetchAllListing, updateQuery } = useListing();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAllListing();
    }
  }, [user]);

  function handleChange(ev) {
    updateQuery(ev.target.value); //updates what the user is typing on change
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    fetchAllListing(); // handles fetch when user submits form
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <h2>{user?.name}</h2> */}

        <label htmlFor="search" className={styles.searchContainer}>
          {" "}
          <input
            id="search"
            type="text"
            name="search"
            onChange={handleChange}
            className={styles.input}
            placeholder="Search"
          />
          <button type="submit" className={styles.searchButton}>
            <FiSearch fill="none" />
          </button>
        </label>
      </form>
    </>
  );
}
