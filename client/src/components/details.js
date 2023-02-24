import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back.svg";

const Details = (props) => {
  const [details, setDetails] = useState({
    color: "",
    caption: "",
  });
  const [postId, setPostId] = useState({
    id: "",
  });

  const url = "http://api.cloudinary.com/v1_1/dxyxmfpoh/image/upload";
  const preset = "zkjuxobi";
  let navigate = useNavigate();
  const location = useLocation();
  console.log(props.user);
  useEffect(() => {
    if (postId.id) {
      fetch("http://localhost:5000/create/addPost_profile", {
        method: "POST",
        body: JSON.stringify({
          postId: postId.id,
          userId: props.user._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(-2);
    }
  }, [postId]);

  const goBack = () => {
    navigate(-1);
  };

  const share = async () => {
    let pfpURL = "";

    // submit to cloudinary
    const formData = new FormData();
    formData.append("file", location.state);
    formData.append("upload_preset", preset);

    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (pfpURL = data.url));

    // create post
    const post = {
      owner: props.user.handle,
      likes: 0,
      desc: details.caption,
      img: pfpURL,
      date: new Date(),
      comments: [],
    };

    fetch("http://localhost:5000/create/add_post", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPostId(data));
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
        <img className="details__caption-pfp" src={props.user.pfp} />
        <textarea
          className="details__caption-input"
          onFocus={focus}
          onBlur={blur}
        ></textarea>
        <img
          className="details__caption-img"
          src={URL.createObjectURL(location.state)}
        />
      </div>
      <div className={`details__focus ${details.color}`}></div>
    </div>
  );
};

export default Details;
