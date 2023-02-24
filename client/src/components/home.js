import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Login from "./login";
import Feed from "./feed";
import Navbar from "./navbar";
import BttmNavbar from "./bttmNavbar";
import Profile from "./profile/profile";
import Followers from "./profile/followers";
import Following from "./profile/following";
import Post from "./profile/post";
import CreatePost from "./createPost";
import Details from "./details";
import Signup from "./signup";
import AccountName from "./accountName";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState({
    username: "",
    id: "",
  });
  const [profile, setProfile] = useState({
    _id: "",
    handle: "",
    name: "",
    followers: [],
    follows: [],
    posts: [],
  });
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
              : updateStates(data, false)
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
      }
    };
  }, [loggedIn]);

  useEffect(() => {
    // get user profile

    if (user.username != "") {
      fetch(`http://localhost:5000/${user.username}`)
        .then((res) => res.json())
        .then((data) => setProfile(data));
    }
  }, [user]);

  const display = () => {
    if (loggedIn) {
      return (
        <div>
          <Navbar />
          <Feed />
          <BttmNavbar user={profile} />
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
      element: [<Profile user={profile} />, <BttmNavbar user={profile} />],
    },
    {
      path: "/:id/followers",
      element: [<BttmNavbar user={profile} />, <Followers user={profile} />],
    },
    {
      path: "/:id/following",
      element: [<BttmNavbar user={profile} />, <Following user={profile} />],
    },
    { path: "/p/:id", element: [<BttmNavbar user={profile} />, <Post />] },
    { path: "/create", element: [<CreatePost />] },
    { path: "/search", element: [<Navbar />, <BttmNavbar user={profile} />] },
    { path: "/create/details", element: [<Details user={profile} />] },
    { path: "/signup/email", element: [<Signup />] },
    { path: "signup/email/name", element: [<AccountName />] },
  ]);

  return element;
};

export default Home;
