import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />

      {/* Outlet load home, about, searchCrap, offerCarp, myCrap    */}
    </>
  );
}

export default App;
