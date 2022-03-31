import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import activity from "../assets/activity.svg";
import comment from "../assets/comment.svg";
import msg from "../assets/msg.svg";
import profile from "../assets/profile.jpg";

// const Comment = (props) => {
//   return (
//     <div className="post__comment">
//       <div className="post__comment-owner">{props.comment.owner}</div>
//       <div className="post__comment-comment">{props.comment.comment} </div>
//     </div>
//   );
// };

// const displayComments = (comments) => {
//   return comments.map((comment) => {
//     return <Comment key={comment._id} comment={comment} />;
//   });
// };

const Post = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    fetch(`http://localhost:5000${path}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
    return;
  }, []);

  const onLike = async () => {
    const updatedPost = post;
    updatedPost.likes++;

    await fetch(`http://localhost:5000/p/${post._id}`, {
      method: "POST",
      body: JSON.stringify({ post: updatedPost, type: "like" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPost({});
    setPost(updatedPost);
  };

  return (
    <div className="post">
      <div className="post__owner">
        <div className="post__owner-img">
          <img className="post__owner-pfp" src={profile} alt="temp pfp" />
        </div>
        <div className="post__owner-handle">
          <a href={"/"}>{post != undefined && post.owner}</a>
        </div>
      </div>
      <div className="post__img"></div>
      <div className="post__engage">
        <div className="post__engage-like">
          <img src={activity} alt="like" onClick={onLike} />
        </div>
        <div className="post__engage-comment">
          <img src={comment} alt="comment" />
        </div>
        <div className="post__engage-share">
          <img src={msg} alt="share" />
        </div>
      </div>
      <div className="post__interact">
        <div className="post__likes">{`${
          post != undefined && post.likes
        } likes`}</div>
        <div className="post__body">
          <div className="post__body-desc">
            <p className="post__body-owner">
              {post != undefined && post.owner}
            </p>
            {post != undefined && post.desc}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
