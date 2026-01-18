import { useEffect } from "react";
import styles from "./searchForm.module.css";
// Context
import { useCrap } from "../context/crap.provider.jsx";
import { useAuth } from "../context/auth.context";
// Components
import CrapCard from "../components/crapcard";

/** Search form component */
export default function SearchForm() {
  const { fetchAllCrap, updateQuery, allData, hasSearch } = useCrap();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAllCrap();
    }
  }, [user]);

  function handleChange(ev) {
    updateQuery(ev.target.value); //updates what the user is typing on change
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    fetchAllCrap(); // handles fetch when user submits form
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {user?.avatar && (
          <img
            src={user.avatar}
            className={styles.img}
            referrerPolicy="no-referrer"
          />
        )}
        <h2>{user?.name}</h2>

        <label htmlFor="search">
          {" "}
          <input
            type="text"
            name="search"
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button>Search</button>
      </form>

      {!hasSearch ? (
        <p className={styles.p}>Go find some good crap</p>
      ) : allData.length === 0 ? (
        <p className={styles.p}>No results found</p>
      ) : (
        <ul className={styles.cardList}>
          {allData.map((item) => (
            <li key={item._id} className={styles.cardItem}>
              <CrapCard key={item._id} crap={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
