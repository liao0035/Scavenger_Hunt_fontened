import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
// Provider
import { CrapProvider } from "./context/crap.provider.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
// pages
import Home from "./page/home.jsx";
import Login from "./page/login.jsx";
import CrapId from "./page/crapid.jsx";
import Mine from "./page/mine.jsx";
import Offer from "./page/offer.jsx";
import NotFound from "./page/notfound.jsx";
// component
import ProtectedRoute from "./components/protectroute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CrapProvider>
        <BrowserRouter>
          <Routes>
            {/* path="/" this is the frame for entire project; like nav + footer */}
            <Route path="/" element={<App />}>
              {/* / => shows <App> + <Home /> "bc of index" */}
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              {/* /login =>  <App> + <Login /> */}
              <Route
                path="crap/:id"
                element={
                  <ProtectedRoute>
                    <CrapId />
                  </ProtectedRoute>
                }
              />
              <Route
                path="mine"
                element={
                  <ProtectedRoute>
                    <Mine />
                  </ProtectedRoute>
                }
              />
              <Route
                path="offer"
                element={
                  <ProtectedRoute>
                    <Offer />
                  </ProtectedRoute>
                }
              />
              {/* public route */}
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CrapProvider>
    </AuthProvider>
  </StrictMode>
);
