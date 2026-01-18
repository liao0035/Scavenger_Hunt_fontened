import dayjs from "dayjs";
import styles from "./crapcard.module.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
// Context
import { useAuth } from "../context/auth.context";
// Components
import StateBtn from "./statebtn";
import SuggestForm from "./suggestform";

/** Component for a single crap card */
export default function CrapCard({ crap }) {
  const { user } = useAuth();
  const { id } = useParams();
  const isOwner = Boolean(crap.owner?._id === user.id);
  let msg;

  // checks to see if crap belongs to buyer or seller
  isOwner
    ? (msg = `This is ${user.name}'s crap!!!`)
    : (msg = "This is NOT your crap!!!");

  return !id ? (
    <NavLink to={`/crap/${crap._id}`}>
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={crap.images[0]} />
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.title}>{crap.title}</h3>
          <p className={styles.cardHeading}>
            <span>Description:</span> {crap.description}
          </p>
          <p className={styles.cardHeading}>
            <span>Status:</span> {crap.status}
          </p>
          <p className={styles.msg}>{msg}</p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={crap.images[0]} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.title}>{crap.title}</h3>
        <p className={styles.cardHeading}>
          <span>Description:</span> {crap.description}
        </p>
        <p className={styles.cardHeading}>
          <span>Status:</span> {crap.status}
        </p>
        <p className={styles.msg}>{msg}</p>

        {crap.status === "SCHEDULED" && (
          <div className={styles.scheduleBox}>
            <p>
              <strong>Pickup Address:</strong> {crap.suggestion.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {dayjs(crap.suggestion.date).format("YYYY-MM-DD")}
            </p>
            <p>
              <strong>Time:</strong> {crap.suggestion.time}
            </p>
          </div>
        )}
        {crap.status === "INTERESTED" && isOwner ? (
          <SuggestForm crap={crap} />
        ) : (
          <StateBtn crap={crap} />
        )}
      </div>
    </div>
  );
}
