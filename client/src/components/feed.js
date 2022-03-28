import React, { useState, useEffect } from "react";

const Post = (props) => {
  return (
    <div className="post">
      <div className="post__op"></div>
      <div className="post__img"></div>
      <div className="post__engage"></div>
      <div className="post__body">
        <div className="post__body-desc">{props.body}</div>
        <div className="post__body-comments"></div>
      </div>
    </div>
  );
};

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((posts) => setFeed(posts));
    return;
  }, [feed.length]);

  const displayFeed = () => {
    return feed.map((post) => {
      return <Post key={post._id} body={post.body} />;
    });
  };

  return <div className="feed">{displayFeed()}</div>;
};

export default Feed;
