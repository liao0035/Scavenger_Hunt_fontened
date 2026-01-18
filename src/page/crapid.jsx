import styles from "./crapid.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// Context
import { useCrap } from "../context/crap.provider.jsx";

// Components
import Loader from "../components/loader.jsx";
import CrapCard from "../components/crapcard.jsx";

export default function CrapId() {
  const { id } = useParams();
  const { singleData, fetchCrapById, loading, error } = useCrap();

  useEffect(() => {
    if (id) {
      fetchCrapById(id);
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
          <CrapCard crap={singleData} />
        </li>
      </ul>
    </>
  );
}
