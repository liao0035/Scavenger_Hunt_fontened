import styles from "./mine.module.css";
import { useEffect } from "react";
// provider
import { useAuth } from "../context/auth.context";
import { useCrap } from "../context/crap.provider";

// component
import CrapCard from "../components/crapcard";
import Loader from "../components/loader";

export default function Mine() {
  const { loading, fetchMineCrap, myCrapList } = useCrap();
  const { user, token } = useAuth();

  useEffect(() => {
    fetchMineCrap();
  }, [token]);

  useEffect(() => {
    console.log("myCrapList：", myCrapList);
  }, [myCrapList]);

  return (
    <>
      <section>
        <h2 className={styles.h2}>{user.name}'s Crap</h2>
        {loading && <Loader />}
        {!loading && Object.entries(myCrapList).length === 0 && (
          <p>You have no crap!</p>
        )}

        {Object.entries(myCrapList).map(([status, craps]) => (
          <>
            <h3 className={styles.statusGroup}>{status}</h3>
            <ul key={status} className={styles.cardList}>
              {craps.map((crap) => (
                <li className={styles.cardItem}>
                  <CrapCard key={crap.id} crap={crap} />
                </li>
              ))}
            </ul>
          </>
        ))}
      </section>
    </>
  );
}