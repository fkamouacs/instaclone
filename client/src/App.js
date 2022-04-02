import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Post from "./components/post";
import BttmNavbar from "./components/bttmNavbar";
import CreatePost from "./components/createPost";
import Details from "./components/details";
import Signup from "./components/signup";
import AccountName from "./components/accountName";

const App = () => {
  let element = useRoutes([
    { path: "/", element: [<Navbar />, <BttmNavbar />] },
    { path: "/:id", element: [<Navbar />, <BttmNavbar />, <Profile />] },
    { path: "/p/:id", element: [<BttmNavbar />, <Post />] },
    { path: "/create", element: [<CreatePost />] },
    { path: "/search", element: [<Navbar />, <BttmNavbar />] },
    { path: "/create/details", element: [<Details />] },
    { path: "/signup/email", element: [<Signup />] },
    { path: "signup/email/name", element: [<AccountName />] },
  ]);

  return element;
};

export default App;
