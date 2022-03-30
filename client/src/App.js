import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import BttmNavbar from "./components/bttmNavbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <BttmNavbar />
    </div>
  );
};

export default App;
