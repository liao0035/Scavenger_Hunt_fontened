import styles from "./login.module.css";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../context/auth.context.jsx";
import LoginBtn from "../components/loginbtn.jsx";

export default function Login() {
  const { setAuth, isLogin, user, getMyLocation } = useAuth();
  let [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    //check the querystring for a token
    if (searchParams.has("token")) {
      let token = searchParams.get("token");
      setAuth(token);
      nav("/");
      getMyLocation();
      return;
    }
  }, []);

  return (
    <main className={styles.main}>
      {/* if logged out show this */}
      {!isLogin && (
        <>
          <h2>Welcome to Scavenger Hunt</h2>
          <p>
            Looking to get rid of your crap? <span>Great!</span>
          </p>
          <p>
            Wanna buy some crap? <span>Even better!</span>
          </p>
          <p>Or click Login on the top right!</p>
        </>
      )}
      {isLogin && user && (
        <>
          <p>Welcome back, {user.name}</p>
        </>
      )}
      {/* <LoginBtn /> */}
    </main>
  );
}
