import styles from "./header.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
// Context
import { useAuth } from "../context/auth.context";
// image
import logoOnly from "../assets/logoOnly.svg";
// loginBtn
import LoginBtn from "../components/loginbtn.jsx";

/** Header component for entire website */
export default function Header() {
  const { isLogin } = useAuth();

  return (
    <header className={styles.nav}>
      <div className={styles.container}>
        <NavLink to="/">
          <img src={logoOnly} />
          <div className={styles.logo}>
            <h1 className={styles.logo}>ScavengerHunt</h1>
            <p className={styles.logo}>Used Item Market Place</p>
          </div>
        </NavLink>

        <nav className={styles.navBar}>
          <ul className={styles.linkGroup}>
            {isLogin && (
              <>
                <li>
                  {" "}
                  <NavLink to="/" className={styles.link}>
                    Home
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/mine" className={styles.link}>
                    My List
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/offer" className={styles.link}>
                    Create Listing
                  </NavLink>
                </li>
              </>
            )}
            <li>
              {" "}
              {/* <NavLink to="/login" className={styles.link}>
                {isLogin ? "Log out" : "Log in"}
              </NavLink> */}
              <LoginBtn className={styles.link} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
