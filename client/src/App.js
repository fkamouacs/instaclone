import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Feed from "./components/feed";
import BttmNavbar from "./components/bttmNavbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
      <BttmNavbar />
    </div>
  );
};

export default App;
