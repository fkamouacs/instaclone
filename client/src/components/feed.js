import React, { useState, useEffect } from "react";
import activity from "../assets/activity.svg";
import comment from "../assets/comment.svg";
import msg from "../assets/msg.svg";
import profile from "../assets/profile.jpg";
import Login from "./login";

const Feed = () => {
  return <Login />;
};

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

// const Post = (props) => {
//   const [post, setPost] = useState();

//   useEffect(() => {
//     setPost(props);
//   });

//   const onLike = async () => {
//     const updatedPost = post;
//     updatedPost.post.likes++;

//     await fetch(`http://localhost:5000/posts/${post.post._id}`, {
//       method: "POST",
//       body: JSON.stringify(post.post),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     setPost(updatedPost.post);
//   };

//   return (
//     <div className="post">
//       <div className="post__owner">
//         <div className="post__owner-img">
//           <img className="post__owner-pfp" src={profile} alt="temp pfp" />
//         </div>
//         <div className="post__owner-handle">
//           <a href={`/${props.post.op}`}>{props.post.op}</a>
//         </div>
//       </div>
//       <div className="post__img"></div>
//       <div className="post__engage">
//         <div className="post__engage-like">
//           <img src={activity} alt="like" onClick={onLike} />
//         </div>
//         <div className="post__engage-comment">
//           <img src={comment} alt="comment" />
//         </div>
//         <div className="post__engage-share">
//           <img src={msg} alt="share" />
//         </div>
//       </div>
//       <div className="post__interact">
//         <div className="post__likes">{`${props.post.likes} likes`}</div>
//         <div className="post__body">
//           <div className="post__body-desc">
//             <p className="post__body-owner">{props.post.op}</p>
//             {props.post.desc}
//           </div>
//           {displayComments(props.post.comments)}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Feed = () => {
//   const [feed, setFeed] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/posts")
//       .then((res) => res.json())
//       .then((posts) => setFeed(posts));
//     return;
//   }, [feed.length]);

//   const displayFeed = () => {
//     return feed.map((post) => {
//       return <Post key={post._id} post={post} />;
//     });
//   };

//   return <div className="feed">{displayFeed()}</div>;
// };

export default Feed;
