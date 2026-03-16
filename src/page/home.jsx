// context
import { useListing } from "../context/listing.provider";
// Components
import ListingCard from "../components/listingcard";
import styles from "./home.module.css";

export default function Home() {
  const { allData, hasSearch } = useListing();
  return (
    <div className={styles.main}>
      {!hasSearch ? (
        <h2 className={styles.msg}>Search for Item</h2>
      ) : allData.length === 0 ? (
        <h2 className={styles.msg}>No results found</h2>
      ) : (
        <ul className={styles.cardList}>
          {allData.map((item) => (
            <li key={item._id} className={styles.cardItem}>
              <ListingCard key={item._id} listing={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
