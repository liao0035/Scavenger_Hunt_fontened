import SearchForm from "../components/searchForm";
// context
import { useCrap } from "../context/crap.provider";
// Components
import CrapCard from "../components/crapcard";
import styles from "./home.module.css";

export default function Home() {
  const { allData, hasSearch } = useCrap();
  return (
    <>
      {!hasSearch ? (
        <p className={styles.p}>Search for Item</p>
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
      {/* <SearchForm /> */}
    </>
  );
}
