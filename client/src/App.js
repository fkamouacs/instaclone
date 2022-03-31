import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Post from "./components/post";
import BttmNavbar from "./components/bttmNavbar";
import CreatePost from "./components/createPost";
import Details from "./components/details";

const App = () => {
  let element = useRoutes([
    { path: "/", element: [<Navbar />, <BttmNavbar />] },
    { path: "/:id", element: [<Navbar />, <BttmNavbar />, <Profile />] },
    { path: "/p/:id", element: [<BttmNavbar />, <Post />] },
    { path: "/create", element: [<CreatePost />] },
    { path: "/search", element: [<Navbar />, <BttmNavbar />] },
    { path: "/create/details", element: [<Details />] },
  ]);

  return element;
};

export default App;
{
  /* <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>

      <Routes>
        <Route path="/create" element={<CreatePost />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/p/:id" element={<Post />} />
      </Routes>
      <BttmNavbar /> */
}
