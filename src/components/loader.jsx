import styles from "./loader.module.css";
import { PacmanLoader } from "react-spinners";

/** Loader component */
export default function Loader() {
  return (
    <main>
      <div className={styles.container}>
        <PacmanLoader color="#372e2d" />
      </div>
    </main>
  );
}
