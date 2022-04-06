import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Login = () => {
  const [showLogin, setLogin] = useState(false);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false);
  const [active, setActive] = useState();
  const loginClass = showLogin
    ? "login login__login-home"
    : "login login__home";

  useEffect(() => {
    name === undefined ||
    password === undefined ||
    name === "" ||
    password === ""
      ? setActive("")
      : setActive("login__btn-active");

    // fetch("/isUserAuth", {
    //   headers: {
    //     "x-access-token": localStorage.getItem("token"),
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => (data.isLoggedIn ? console.log("login") : null));
  });

  const logName = (e) => {
    setInvalid(false);
    if (e.key === "Enter") {
      e.target.blur();
    } else {
      setName(e.target.value);
    }
  };

  const logPassword = (e) => {
    setInvalid(false);
    if (e.key === "Enter") {
      e.target.blur();
    } else {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    if (active) {
      await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
        });
    } else {
      console.log("not active");
    }
  };

  const login = () => {
    return (
      <div className="login__login">
        <div className="login__inputs">
          <div className="login__name-wrapper">
            <input
              className="login__name"
              placeholder="Username or email"
              onKeyUp={logName}
              spellCheck="false"
            />
          </div>
          <div className="login__password-wrapper">
            <input
              className="login__password"
              placeholder="Password"
              onKeyUp={logPassword}
              spellCheck="false"
              type="password"
            />
          </div>
        </div>
        <div className="login__func">
          <div className="login__forgot">Forgot password?</div>
          <button className={`login__btn ${active}`} onClick={handleLogin}>
            Log In
          </button>
          <div className="login__register">
            <p className="login__register-text">Dont have an account?</p>
            <button className="login__signup-btn">Sign Up</button>
          </div>
        </div>
      </div>
    );
  };

  const showOptions = () => {
    return (
      <div className="login__prompts">
        <button className="login__login-btn" onClick={() => setLogin(true)}>
          Log In
        </button>

        <div className="login__or">or</div>
        <button className="login__signup-btn">Sign Up</button>
      </div>
    );
  };

  return (
    <div className="login__wrapper">
      <div className={loginClass}>
        <div className="login__title">
          <img className="login__title-logo" src={logo} alt="logo" />
        </div>
        <div className="login__desc">
          Sign up to see photos and videos from your friends
        </div>
        <div className="login__app">
          <button className="login__app-btn">Get the Instagram app</button>
        </div>
        {showLogin && login()}
        {!showLogin && showOptions()}
      </div>
    </div>
  );
};

export default Login;
