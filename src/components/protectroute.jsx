import { Navigate } from "react-router-dom";
// Context
import { useAuth } from "../context/auth.context";
// Components
import Loader from "./loader";

export default function ProtectedRoute({ children }) {
  const { isLogin, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  if (!isLogin) {
    return <Navigate to="/login" replace />;
    // with replace the user cannot use go back <
  }
  return children;
}
