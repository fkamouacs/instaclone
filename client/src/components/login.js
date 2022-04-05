import React from "react";
import logo from "../assets/logo.png";

const login = () => {
  return (
    <div className="login">
      <div className="login__title">
        <img className="login__title-logo" src={logo} alt="logo" />
      </div>
      <div className="login__desc">
        Sign up to see photos and videos from your friends
      </div>
      <div className="login__app">
        <button className="login__app-btn">Get the Instagram app</button>
      </div>

      <div className="login__prompts">
        <button className="login__login-btn">Log In</button>
        <div className="login__or">or</div>
        <button className="login__signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default login;
