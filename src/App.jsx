import { Outlet } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <Outlet />

      {/* Outlet load home, about, searchListing, offerCarp, myListing    */}
    </>
  );
}

export default App;
