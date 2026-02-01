import styles from "./listingid.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// Context
import { useListing } from "../context/listing.provider.jsx";

// Components
import Loader from "../components/loader.jsx";
import ListingCard from "../components/listingcard.jsx";

export default function ListingId() {
  const { id } = useParams();
  const { singleData, fetchListingById, loading, error } = useListing();

  useEffect(() => {
    if (id) {
      fetchListingById(id);
    }
  }, [id]);

  if (loading || !singleData) {
    return <Loader />;
  }

  if (error) {
    return <p>oops, something went wrong :{error.message}</p>;
  }

  return (
    <>
      <ul className={styles.cardList}>
        {" "}
        <li className={styles.cardItem}>
          <ListingCard listing={singleData} />
        </li>
      </ul>
    </>
  );
}
