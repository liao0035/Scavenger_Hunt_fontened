import { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();

function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    let cookies = document.cookie;
    let _token = cookies
      .split("; ")
      .find((ck) => ck.startsWith("token="))
      ?.split("=")[1];

    if (_token) {
      setIsLogin(true);
      setToken(_token);
      try {
        const base64Payload = _token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        setUser(payload);
      } catch (err) {
        setUser(null);
      }
    } else {
      setIsLogin(false);
      setToken(null);
    }

    // setTimeout(() => {
    setLoading(false);
    // }, 2000);
  }

  function setAuth(_token) {
    document.cookie = `token=${_token}; path=/`;
    setIsLogin(true);
    setToken(_token);
    try {
      const base64Payload = _token.split(".")[1]; //decode user info
      const payload = JSON.parse(atob(base64Payload));
      setUser(payload);
    } catch (err) {
      console.error("failed to decode token", err);
      setUser(null);
    }
  }

  function logout() {
    document.cookie = `token=; Max-Age=0`;
    setToken(null);
    setIsLogin(false);
  }

  function getMyLocation() {
    const options = {
      maxAge: 60 * 60 * 1000, //1 hour
      timeout: 15 * 1000, //15 seconds
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log("Got location!");
        setLocation([lat, lng]);
      },
      (err) => {
        console.log("Did not get location... setting location to [0,0]");
        setLocation([0, 0]); //set default location if user denies location permission
        console.log(err);
      },
      options,
    );
  }
  return (
    <AuthContext.Provider
      {...props}
      value={{
        isLogin,
        token,
        loading,
        user,
        location,
        setAuth,
        logout,
        checkAuth,
        getMyLocation,
        setLocation,
      }}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Hook is not inside provider");
  return context;
}

export { useAuth, AuthProvider };
