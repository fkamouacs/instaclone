import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Home from "./components/home";

const App = () => {
  let element = useRoutes([
    { path: "/", element: [<Home />] },
    // { path: "/:id", element: [<BttmNavbar />, <Profile />] },
    // { path: "/p/:id", element: [<BttmNavbar />, <Post />] },
    // { path: "/create", element: [<CreatePost />] },
    // { path: "/search", element: [<Navbar />, <BttmNavbar />] },
    // { path: "/create/details", element: [<Details />] },
    // { path: "/signup/email", element: [<Signup />] },
    // { path: "signup/email/name", element: [<AccountName />] },
  ]);

  return element;
};

export default App;
