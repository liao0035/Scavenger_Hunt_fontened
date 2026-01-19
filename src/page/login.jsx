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
          <h2>Welcome to ScavengerHunt</h2>
          <p>On the Hunt for a particular item?</p>
          <p>You came to the right place!</p>
          <p>Create or view listings to buy and sell whatever</p>
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
