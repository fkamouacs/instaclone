import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.svg";

const Signup = () => {
  const [email, setEmail] = useState();
  const [active, setActive] = useState();
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    email === undefined || email === ""
      ? setActive("")
      : setActive("signup__body-btn-active");

    setInvalid(invalid);
  });

  const logKey = (e) => {
    setInvalid(false);
    if (e.key === "Enter") {
      e.target.blur();
      next();
    } else {
      setEmail(e.target.value);
    }
  };

  const next = () => {
    if (validateEmail(email)) {
      // check if email is registered
      fetch("http://localhost:5000/register/email", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.status === 200
          ? navigate("name", { state: validateEmail(email) })
          : setInvalid(true)
      );
    } else {
      setInvalid(true);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <div className="signup">
      <div className="signup__nav">
        <div className="signup__nav-back">
          <img src={back} alt="back" onClick={goBack} />
        </div>
        <div className="signup__nav-title">Register</div>
        <div className="signup__nav-dummy"></div>
      </div>
      <div className="signup__body">
        <div className="signup__body-title">EMAIL</div>
        <div className="signup__body-input-container">
          <input
            className="signup__body-input"
            autoComplete="email"
            placeholder="Email Address"
            type="email"
            onKeyUp={logKey}
          />
          {invalid && <div className="signup__body-input-invalid">invalid</div>}
        </div>
        <button className={`signup__body-btn ${active}`} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Signup;
