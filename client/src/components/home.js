import React, { useState, useEffect } from "react";
import Login from "./login";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.isLoggedIn ? setLoggedIn(true) : setLoggedIn(false)
      );
  });

  return (
    <div>
      {loggedIn && <div>loggedin</div>}
      {!loggedIn && <Login />}
    </div>
  );
};

export default Home;
