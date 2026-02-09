import axios from "axios";
import styles from "./offerForm.module.css";
import { useState, useEffect } from "react";
// Context
import { useAuth } from "../context/auth.context.jsx";
// img
import logoOnly from "../assets/logoOnly.svg";
import { blue } from "@mui/material/colors";

/** Offer form component */
export default function OfferForm() {
  // makes sure that when we're in development, we're using the local backend
  const BASE_URL = import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://scavenger-hunt-backend-r6iw.onrender.com";

  const { token, location, getMyLocation } = useAuth();
  const [data, setData] = useState({ title: "", description: "" });
  const [files, setFiles] = useState([]);
  const [UploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (location === null) {
      getMyLocation();
    }
  }, [location]);

  const handleFileChange = (ev) => {
    const listingFiles = Array.from(ev.target.files); //takes each file and puts it into an array
    setFiles(listingFiles);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formattedName =
      data.title.charAt(0).toUpperCase() + data.title.slice(1).toLowerCase();
    setIsUploading(true);
    setUploadProgress(0);
    const formattedDescription =
      data.description.charAt(0).toUpperCase() +
      data.description.slice(1).toLowerCase();
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData(); //builds new form data object
    formData.append("title", formattedName);
    formData.append("description", formattedDescription);
    formData.append(
      "location",
      JSON.stringify({
        type: "Point",
        coordinates: location,
      }),
    );
    files.forEach((file) => {
      formData.append("images", file);
    }); // maps through the (image) files and appends each one to the form data

    try {
      const res = await axios.post(`${BASE_URL}/api/listing`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (ProgressEvent) => {
          const percent = Math.round(
            (ProgressEvent.loaded * 100) / ProgressEvent.total,
          );
          setUploadProgress(percent);
        },
      });
      console.log("create res", res.data);
      window.location.href = `/listing/${res.data.data._id}`;
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className={styles.formControl}>
        <h2>Create new Listing</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Name:</label>
          <input
            required
            minLength={3}
            maxLength={255}
            type="text"
            name="title"
            id="title"
            value={data.title}
            onChange={(ev) =>
              // sets the data for title into our state variable
              // it spreads the already existing data and only overrides the title with whatever the user is typing
              setData({
                ...data,
                title: ev.target.value,
              })
            }
          />
          {/* as the user types in the input, we set the value of the specific input in setData */}
          <label htmlFor="description">Description:</label>
          <textarea
            required
            minLength={3}
            maxLength={255}
            name="description"
            id="description"
            value={data.description}
            onChange={(ev) =>
              setData({
                ...data,
                description: ev.target.value,
              })
            }
          ></textarea>

          <div className={styles.btnGroup}>
            <label htmlFor="image" className="btn">
              Upload image
            </label>
            <input
              required
              type="file"
              name="images"
              id="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />

            <button disabled={isUploading}>
              {isUploading ? "Uploading..." : "Offer your list"}
            </button>
          </div>

          {files.length > 0 && (
            <ul>
              {files.map((file, idx) => (
                <li key={idx}>
                  <strong>{file.name}</strong> is attached
                </li>
              ))}
            </ul>
          )}

          {isUploading && (
            <>
              <div style={{ color: blue[500] }}>
                uploading: {UploadProgress}%
              </div>
              <progress
                value={UploadProgress}
                max="100"
                style={{ width: "100%" }}
              />
            </>
          )}
        </form>
      </div>
    </>
  );
}
