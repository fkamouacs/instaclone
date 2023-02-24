import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import activity from "../../assets/activity.svg";
import comment from "../../assets/comment.svg";
import msg from "../../assets/msg.svg";
import profile from "../../assets/profile.jpg";

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

const Post = (props) => {
  const [post, setPost] = useState({
    date: "",
  });
  const [liked, setLiked] = useState();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (props.postId) {
      fetch(`http://localhost:5000/p/${props.postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
        });
    } else {
      fetch(`http://localhost:5000${path}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }

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

  const calculateDate = () => {
    const today = new Date();
    const postDate = new Date(post.date);
    const diff = today - postDate;

    let base = Math.floor(diff / 86400000);
    if (diff >= 86400000) return `${base} day${base != 1 ? "s" : ""} ago`;
    base = Math.floor(diff / 36e5);
    if (diff > 36e5) return `${base} hour${base != 1 ? "s" : ""} ago`;
    base = Math.floor(diff / 60e3);
    if (diff > 60e3) return `${base} minute${base != 1 ? "s" : ""} ago`;
    else return `${diff / 1000} seconds ago`;
  };

  const checkPfp = () => {
    if (props.owner.pfp) return props.owner.pfp;

    return profile;
  };
  return (
    <main className="main">
      <div className="post">
        <div className="post__owner">
          <div className="post__owner-img">
            <img className="post__owner-pfp" src={checkPfp()} alt="temp pfp" />
          </div>
          <div className="post__owner-handle">
            <a href={`/${post.owner}`}>{post != undefined && post.owner}</a>
          </div>
        </div>
        <img className="post__img" src={post.img} />
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
            <div className="post__body-date">{calculateDate()}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
