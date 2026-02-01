import styles from "./statebtn.module.css";
// Context
import { useAuth } from "../context/auth.context";
import { useListing } from "../context/listing.provider.jsx";

/** Component that handles the user/buyer flow (as a button)
 * this is put inside our listing card when we are in the listing details
 */
export default function StateBtn({ listing, onActionChange }) {
  const { user } = useAuth();
  const { sendPostData } = useListing();
  const status = listing.status;
  const isOwner = Boolean(listing.owner._id === user.id); //compares the listing owner the current logged-in user to see if user is a buyer or seller

  function handleClick(action) {
    if (onActionChange) {
      onActionChange(action);
    } // if statement as a safeguard
    // if status is interested and isOwner is true, return
    // if not, send post request
    if (status === "INTERESTED" && isOwner) {
      return;
    } else {
      sendPostData(listing._id, null, action);
    }
  }

  // uses a switch statement that checks the status of the listing first THEN if user is a buyer or seller
  // when user clicks the button, we pass in a string as our action, which triggers handleClick.
  // we then pass in action to onActionChange, which sets the action in our parent component (action is used as the endpoint to our API req)
  function renderButtons() {
    switch (status) {
      case "AVAILABLE":
        return isOwner ? null : (
          <button type="submit" onClick={() => handleClick("INTERESTED")}>
            I want it.
          </button>
        );
      case "INTERESTED":
        return isOwner ? (
          <button
            type="submit"
            form="suggestionForm"
            onClick={() => handleClick("SUGGEST")}
          >
            Schedule Pickup
          </button>
        ) : (
          <button type="submit" onClick={() => handleClick("RESET")}>
            Nah, I changed my mind.
          </button>
        );
      case "SCHEDULED":
        return isOwner ? (
          <button type="submit" onClick={() => handleClick("RESET")}>
            Cancel Pickup
          </button>
        ) : (
          <div className={styles.btnGroup}>
            <button type="submit" onClick={() => handleClick("AGREE")}>
              Agree Pickup Time
            </button>
            <button type="submit" onClick={() => handleClick("DISAGREE")}>
              Request a Different Time
            </button>
          </div>
        );
      case "AGREED":
        return isOwner ? (
          <button type="submit" onClick={() => handleClick("FLUSH")}>
            Pickup Complete
          </button>
        ) : null;
      default:
        return null;
    }
  }

  return <>{renderButtons()}</>;
}
