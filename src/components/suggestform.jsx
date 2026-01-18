import styles from "./suggestform.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
// Context
import { useCrap } from "../context/crap.provider";
// Components
import BasicDatePicker from "../components/datepicker";
import dayjs from "dayjs";
import StateBtn from "./statebtn";

/** Form that sets a seller's suggestion to pickup an item
 * sets address, date, time
 */
export default function SuggestForm({ crap }) {
  const { id } = useParams();
  const { sendPostData } = useCrap();

  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [action, setAction] = useState(null);

  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("address", address);
    formData.append("date", date);
    formData.append("time", time);
    sendPostData(id, formData, action);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="suggestionForm" className={styles.form}>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
          />
        </label>

        <label htmlFor="date">
          Date:
          <BasicDatePicker
            value={date}
            onChange={(newDate) => {
              const formatted = dayjs(newDate);
              console.log("user selected", formatted.format("YYYY-MM-DD"));
              setDate(formatted);
            }}
          />
        </label>

        <label htmlFor="time">
          Time:
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.input}
          />
        </label>
        <StateBtn crap={crap} onActionChange={setAction} />
      </form>
    </>
  );
}
