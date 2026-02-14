import { NavLink, useNavigate } from "react-router";
// Context
import { useAuth } from "../context/auth.context";
// icon
import { AiFillGoogleCircle } from "react-icons/ai";
// style
import styles from "./loginbtn.module.css";

/** Login/logout button component */
export default function LoginBtn({ className }) {
  const { isLogin, logout } = useAuth();
  const nav = useNavigate();

  const BASE_URL = import.meta.env.DEV
    ? "http://localhost:4000"
    : "https://scavenger-hunt-backend-r6iw.onrender.com"; //Remi's backend

  console.log("BASE_URL", BASE_URL);

  const redirectUrl = encodeURIComponent(window.location.href); // encodes current page URL so that it can be safely passed as a query param
  const backendLoginUrl = `${BASE_URL}/auth/google?redirect_url=${redirectUrl}`;

  const handleLogout = () => {
    logout(); //logs the user out
    nav("/"); //navigates to homepage
  };

  const handleLogIn = () => {
    window.location.href = backendLoginUrl;
  };

  return (
    <>
      <NavLink
        className={`${className} ${styles.googleLoginGroup}`}
        onClick={isLogin ? handleLogout : handleLogIn}
      >
        {isLogin ? (
          "Logout"
        ) : (
          <>
            {" "}
            <AiFillGoogleCircle className={styles.googleIcon} /> Login
          </>
        )}
      </NavLink>
    </>
  );
}
