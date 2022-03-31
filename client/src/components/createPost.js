import React from "react";
import { useNavigate } from "react-router-dom";
import close from "../assets/close.svg";

const CreatePost = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const next = () => {
    navigate("details");
  };

  return (
    <div className="create-post">
      <div className="create-post__nav">
        <div className="create-post__nav-close">
          <img
            className="create-post__nav-close-img"
            src={close}
            alt="close"
            onClick={goBack}
          />
        </div>
        <div className="create-post__nav-title">New Photo Post</div>

        <button className="create-post__nav-next" onClick={next}>
          Next
        </button>
      </div>

      <div className="create-post__img"></div>

      <div className="create-post__edit-options">
        <button className="create-post__filter">
          <div>Filter</div>
        </button>
        <button className="create-post__edit">
          <div>Edit</div>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
