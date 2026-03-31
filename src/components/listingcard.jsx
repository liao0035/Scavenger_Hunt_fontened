import dayjs from "dayjs";
import styles from "./listingcard.module.css";
import { NavLink, useParams } from "react-router-dom";
// Context
import { useAuth } from "../context/auth.context";
import { useListing } from "../context/listing.provider.jsx";
// Components
import StateBtn from "./statebtn";
import SuggestForm from "./suggestform";

/** Component for a single listing card */
export default function ListingCard({ listing }) {
  const { user } = useAuth();
  const { deleteListing } = useListing();
  const { id } = useParams();
  const isOwner = Boolean(listing.owner?._id === user.id);
  console.log("current user:", user?.name);
  let msg;

  // checks to see if listing belongs to buyer or seller
  isOwner ? (msg = `It is Your list!!!`) : (msg = `This is ${user.name} list.`);

  return !id ? (
    <NavLink to={`/listing/${listing._id}`}>
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={listing.images[0]} />
        </div>
        <div className={styles.cardInfo}>
          <h2 className={styles.title}>{listing.title}</h2>
          <p className={styles.cardHeading}>
            <span>Description:</span> {listing.description}
          </p>
          <p className={styles.cardHeading}>
            <span>Status:</span> {listing.status}
          </p>
          <p className={styles.msg}>{msg}</p>
          {isOwner && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteListing(listing);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </NavLink>
  ) : (
    <div className={styles.card}>
      <img className={styles.img} src={listing.images[0]} />

      <div className={styles.cardInfo}>
        <h2 className={styles.title}>{listing.title}</h2>
        <p className={styles.cardHeading}>
          <span>Description:</span> {listing.description}
        </p>
        <p className={styles.cardHeading}>
          <span>Status:</span> {listing.status}
        </p>
        <p className={styles.msg}>{msg}</p>

        {listing.status === "SCHEDULED" && (
          <div className={styles.scheduleBox}>
            <p>
              <strong>Pick up Address:</strong> {listing.suggestion.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {dayjs(listing.suggestion.date).format("YYYY-MM-DD")}
            </p>
            <p>
              <strong>Time:</strong> {listing.suggestion.time}
            </p>
          </div>
        )}
        <div className={styles.btnGroup}>
          {listing.status === "INTERESTED" && isOwner ? (
            <SuggestForm listing={listing} />
          ) : (
            <StateBtn listing={listing} />
          )}
          {isOwner && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteListing(listing);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
