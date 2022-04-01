import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.svg";

const Details = () => {
  const [details, setDetails] = useState({
    color: "",
    caption: "",
  });

  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const share = () => {
    // create post
    fetch("http://localhost:5000/add_post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate(-2);
  };

  const focus = () => {
    setDetails({
      color: "text-focus",
    });
  };

  const blur = (event) => {
    // get text
    setDetails({
      color: "",
      caption: event.target.value,
    });
  };

  return (
    <div className="details">
      <div className="details__nav">
        <div className="details__nav-back">
          <img
            className="details__nav-back-img"
            src={back}
            onClick={goBack}
            alt="back"
          />
        </div>

        <div className="details__nav-title">New Post</div>
        <button className="details__nav-share" onClick={share}>
          Share
        </button>
      </div>

      <div className="details__caption">
        <textarea
          className="details__caption-input"
          onFocus={focus}
          onBlur={blur}
        ></textarea>
      </div>
      <div className={`details__focus ${details.color}`}></div>
    </div>
  );
};

export default Details;
