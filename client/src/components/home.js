import React, { useState, useEffect } from "react";
import Login from "./login";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/user/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data ? (data.isLoggedIn ? setLoggedIn(true) : setLoggedIn(false)) : null
      );
  }, []);

  return (
    <div>
      {loggedIn && <div>loggedin</div>}
      {!loggedIn && <Login />}
    </div>
  );
};

export default Home;
