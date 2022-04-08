import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Login from "./login";
import Feed from "./feed";
import Navbar from "./navbar";
import BttmNavbar from "./bttmNavbar";
import Profile from "./profile";
import Post from "./post";
import CreatePost from "./createPost";
import Details from "./details";
import Signup from "./signup";
import AccountName from "./accountName";

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
      return (
        <div>
          <Navbar />
          <Feed />
          <BttmNavbar user={user} />
        </div>
      );
    } else {
      return <Login setLoggedIn={setLoggedIn} />;
    }
  };

  let element = useRoutes([
    { path: "/", element: display() },
    {
      path: "/:id",
      element: [<BttmNavbar user={user} />, <Profile user={user} />],
    },
    { path: "/p/:id", element: [<BttmNavbar user={user} />, <Post />] },
    { path: "/create", element: [<CreatePost />] },
    { path: "/search", element: [<Navbar />, <BttmNavbar user={user} />] },
    { path: "/create/details", element: [<Details />] },
    { path: "/signup/email", element: [<Signup />] },
    { path: "signup/email/name", element: [<AccountName />] },
  ]);

  return element;
};

export default Home;
