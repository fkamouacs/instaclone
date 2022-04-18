import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back.svg";

const AccountName = () => {
  const location = useLocation();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [active, setActive] = useState();
  const [invalid, setInvalid] = useState(false);
  const [id, setId] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    username === undefined ||
    password === undefined ||
    username === "" ||
    password === ""
      ? setActive("")
      : setActive("signup__body-btn-active");
  });

  useEffect(() => {
    // default profile
    if (id != "1") {
      const profile = {
        _id: id.id,
        handle: username,
        name: username,
        bio: "",
        followers: [],
        follows: [],
        posts: [],
      };

      fetch("http://localhost:5000/add_profile", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("XDXD");
    }
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  const logUsername = (e) => {
    setInvalid(false);
    if (e.key === "Enter") {
      e.target.blur();
      next();
    } else {
      setUsername(e.target.value);
    }
  };

  const logPassword = (e) => {
    setInvalid(false);
    if (e.key === "Enter") {
      e.target.blur();
      next();
    } else {
      setPassword(e.target.value);
    }
  };

  const next = async () => {
    if (active) {
      // create user
      let status;
      await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({
          email: location.state[0],
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((data) => setId(data));

      status === 200 ? navigate(`/${username}`) : setInvalid(true);
    }
  };

  return (
    <div className="signup-name">
      <div className="signup-name__nav">
        <div className="signup-name__nav-back">
          <img src={back} alt="back" onClick={goBack} />
        </div>
        <div className="signup-name__nav-title">Register</div>
        <div className="signup__nav-dummy"></div>
      </div>
      <div className="signup-name__body">
        <div className="signup-name__body-title">Enter name and password</div>
        <div className="signup-name__body-subtitle">
          Add your name so friends can find you.
        </div>
        <input
          className="signup-name__body-name"
          placeholder="Full Name"
          onKeyUp={logUsername}
        />
        <input
          className="signup-name__body-password"
          placeholder="Password"
          type="password"
          onKeyUp={logPassword}
        />
        {invalid && (
          <div className="signup-name__body-invalid">
            Username or email already registered
          </div>
        )}
        <button className={`signup-name__body-btn ${active}`} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountName;
