import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Post from "./post";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    fetch(`http://localhost:5000${path}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
    return;
  }, []);

  const numPosts = () => {
    return profile.posts ? profile.posts.length : 0;
  };

  const numFollowers = () => {
    return profile.followers ? profile.followers.length : 0;
  };

  const numFollows = () => {
    return profile.follows ? profile.follows.length : 0;
  };

  const displayPosts = () => {
    return profile.posts
      ? profile.posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      : null;
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__head">
          <div className="profile__head-pfp"></div>
          <div className="profile__head-title">
            <div className="profile__head-handle">{profile.handle}</div>
            <div className="profile__head-func">
              <div className="profile__head-followbtn"></div>
            </div>
          </div>
        </div>

        <div className="profile__desc">
          <div className="profile__desc-bio">{profile.bio}</div>
        </div>
      </div>

      <div className="profile__stats">
        <div className="profile__stats-numposts">
          <div className="profile__stats-numposts-num">{numPosts()}</div>
          {numPosts() != 1 ? "posts" : "post"}
        </div>
        <div className="profile__stats-followers">
          <div className="profile__stats-followers-num">{numFollowers()}</div>
          {numFollowers() != 1 ? "followers" : "follower"}
        </div>
        <div className="profile__stats-following">
          <div className="profile__stats-following-num">{numFollows()}</div>
          following
        </div>
      </div>

      <div className="profile__posts">{displayPosts()}</div>
    </div>
  );
};

export default Profile;
