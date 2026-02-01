import styles from "./mine.module.css";
import { useEffect } from "react";
// provider
import { useAuth } from "../context/auth.context";
import { useListing } from "../context/listing.provider";

// component
import ListingCard from "../components/listingcard";
import Loader from "../components/loader";

export default function Mine() {
  const { loading, fetchMineListing, myListingList } = useListing();
  const { user, token } = useAuth();

  useEffect(() => {
    fetchMineListing();
  }, [token]);

  useEffect(() => {
    console.log("myListingList：", myListingList);
  }, [myListingList]);

  return (
    <>
      <section>
        <h2 className={styles.h2}>{user.name}'s Listings</h2>
        {loading && <Loader />}
        {!loading && Object.entries(myListingList).length === 0 && (
          <h3 className={styles.msg}>You have no listing!</h3>
        )}

        {Object.entries(myListingList).map(([status, listings]) => (
          <>
            <h3 className={styles.statusGroup}>{status}</h3>
            <ul key={status} className={styles.cardList}>
              {listings.map((listing) => (
                <li className={styles.cardItem}>
                  <ListingCard key={listing.id} listing={listing} />
                </li>
              ))}
            </ul>
          </>
        ))}
      </section>
    </>
  );
}
