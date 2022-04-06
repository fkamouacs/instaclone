import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Feed from "./feed";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:5000/user/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) =>
          data
            ? data.isLoggedIn
              ? updateStates(data.data, true)
              : updateStates(data.data, false)
            : null
        );
    };

    fetchData();

    const updateStates = async (data, isLoggedIn) => {
      if (isLoggedIn) {
        setLoggedIn(true);
        setUser({
          id: data.id,
          username: data.username,
        });
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    };
  }, []);

  const display = () => {
    if (loggedIn) {
      return <Feed />;
    } else {
      return <Login setLoggedIn={setLoggedIn} />;
    }
  };

  return <div>{display()}</div>;
};

export default Home;