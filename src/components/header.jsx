import styles from "./header.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
// Context
import { useAuth } from "../context/auth.context";
// image
import logoOnly from "../assets/logoOnly.svg";
// loginBtn
import LoginBtn from "../components/loginbtn.jsx";
//  searchForm
import SearchForm from "../components/searchForm.jsx";

/** Header component for entire website */
export default function Header() {
  const { isLogin, user } = useAuth();

  return (
    <header className={`${styles.nav} ${!isLogin ? styles.loggedOut : ""}`}>
      {/* <header className={styles.nav}> */}
      <div className={styles.container}>
        <NavLink to="/">
          <img className={styles.logo} src={logoOnly} />
          <div className={styles.logo}>
            <h1 className={styles.logo}>ScavengerHunt</h1>
            <p className={styles.logo}>Used Item Marketplace</p>
          </div>
        </NavLink>

        {isLogin && (
          <nav className={styles.navBar}>
            <ul className={styles.linkGroup}>
              <>
                <li className={styles.search}>
                  <SearchForm />
                </li>
                <li>
                  {" "}
                  <NavLink to="/" className={styles.link}>
                    Home
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/mine" className={styles.link}>
                    Your Listings
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/offer" className={styles.link}>
                    Create Listing
                  </NavLink>
                </li>

                <li>
                  <div className={`${styles.liGroup} ${styles.link}`}>
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        className={styles.img}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <LoginBtn />
                  </div>
                </li>
              </>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
