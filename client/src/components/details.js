import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back.svg";

const Details = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const share = () => {
    navigate(-2);
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
        <textarea className="details__caption-input"></textarea>
      </div>
    </div>
  );
};

export default Details;
