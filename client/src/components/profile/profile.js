import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import Post from "./post";
import settings from "../../assets/settings.svg";
import discover from "../../assets/discover.svg";
import profilePic from "../../assets/profile.jpg";
import gallary from "../../assets/gallary.svg";
import feed from "../../assets/feed.PNG";
import save from "../../assets/save.svg";
import foryou from "../../assets/foryou.svg";
import more from "../../assets/more.svg";
import unfollow from "../../assets/unfollow.svg";

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [isOwner, setIsOwner] = useState();
  const [isFollowing, setFollowing] = useState();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const url = "http://api.cloudinary.com/v1_1/dxyxmfpoh/image/upload";
  const preset = "zkjuxobi";
  const [image, setImage] = useState();

  const onChange = async (e) => {
    let pfpURL;

    // submit to cloudinary
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", preset);

    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (pfpURL = data.url));

    //upload url to database
    await fetch("http://localhost:5000/upload/pfp", {
      method: "POST",
      body: JSON.stringify({
        url: pfpURL,
        id: props.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        props.user.pfp = data;
        setImage(data);
      });
  };

  useEffect(() => {
    // Get user
    const fetchUser = async () => {
      fetch("http://localhost:5000/user/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then(async (res) => await res.json())
        .then((data) => {
          setUser(data.data);
        });
    };
    fetchUser();

    return;
  }, []);

  useEffect(() => {
    // get profile
    const fetchData = async () => {
      await fetch(`http://localhost:5000${path}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
        });
    };
    fetchData();
    return;
  }, [path, image]);

  useEffect(() => {
    if (props.user) {
      let handle = path.split("/")[1];
      handle === props.user.handle ? setIsOwner(true) : setIsOwner(false);
    }
    if (props.user.follows.includes(profile._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props]);

  const numPosts = () => {
    return profile.posts ? profile.posts.length : 0;
  };

  const numFollowers = () => {
    return profile.followers ? profile.followers.length : 0;
  };

  const numFollows = () => {
    return profile.follows ? profile.follows.length : 0;
  };

  const handleFollowers = () => {
    navigate("followers", { state: profile });
  };

  const handleFollowing = () => {
    navigate("following", { state: profile });
  };

  const handleFollow = () => {
    console.log("follow");
    // update users follows

    const fetchData = async () => {
      await fetch("http://localhost:5000/follow/id", {
        method: "POST",
        body: JSON.stringify({
          followerId: props.user._id,
          followingId: profile._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setProfile(data));
    };
    fetchData();
    setFollowing(true);
  };

  const handleUnfollow = () => {
    console.log("unfollow");

    const fetchData = async () => {
      fetch("http://localhost:5000/unfollow/id", {
        method: "POST",
        body: JSON.stringify({
          unfollowerId: props.user._id,
          unfollowingId: profile._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setProfile(data));
    };

    fetchData();
    setFollowing(false);
  };

  const displayPosts = () => {
    const length = profile.posts ? profile.posts.length : 0;

    if (length) {
      return profile.posts
        ? profile.posts.map((post) => {
            return <Post key={post._id} owner={profile} postId={post} />;
          })
        : null;
    }
    return (
      <div className="profile__no-posts">
        <div className="profile__no-posts-title">Share Photos</div>
        <div>When you share photos, they will appear on your profile</div>
      </div>
    );
  };

  return (
    <div className="profile">
      {isOwner && (
        <div className="profile">
          <div className="profile__nav">
            <div className="profile__nav-settings">
              <img src={settings} alt="settings" />
            </div>
            <div className="profile__nav-handle">{profile.handle}</div>
            <div className="profile__nav-discover">
              <img src={discover} alt="discover" />
            </div>
          </div>
          <div className="profile__header">
            <div className="profile__head">
              <div className="profile__head-pfp-container">
                <label htmlFor="file-input">
                  {props.user.pfp == "" ? (
                    <img
                      className="profile__head-pfp"
                      src={profilePic}
                      alt="user pfp"
                    />
                  ) : (
                    <Image
                      className="profile__head-pfp"
                      cloudName="dxyxmfpoh"
                      publicId={props.user.pfp}
                    />
                  )}
                </label>

                <input
                  className="profile__head-pfp-input"
                  id="file-input"
                  type="file"
                  name="pfp"
                  onChange={onChange}
                />
              </div>
              <div className="profile__head-func">
                <div className="profile__head-heading">
                  <div className="profile__head-title">
                    <div className="profile__head-handle">{profile.handle}</div>
                    <img className="profile__head-settings" src={settings} />
                  </div>
                </div>
                <button className="profile__head-edit">Edit Profile</button>
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
            <div className="profile__stats-followers" onClick={handleFollowers}>
              <div className="profile__stats-followers-num">
                {numFollowers()}
              </div>
              {numFollowers() != 1 ? "followers" : "follower"}
            </div>
            <div className="profile__stats-following" onClick={handleFollowing}>
              <div className="profile__stats-following-num">{numFollows()}</div>
              following
            </div>
          </div>

          <div className="profile__post-nav">
            <div className="profile__post-nav-gallary">
              <img src={gallary} alt="gallary" />
            </div>
            <div className="profile__post-nav-feed">
              <img
                className="profile__post-nav-feed-img"
                src={feed}
                alt="feed"
              />
            </div>
            <div className="profile__post-nav-saved">
              <img src={save} alt="save" />
            </div>
            <div className="profile__post-nav-foryou">
              <img src={foryou} alt="foryou" />
            </div>
          </div>

          <div className="profile__posts">{displayPosts()}</div>
        </div>
      )}

      {!isOwner && (
        <div className="profile">
          <div className="profile__nav">
            <div className="profile__nav-settings">
              <img src={settings} alt="settings" />
            </div>
            <div className="profile__nav-handle">{profile.handle}</div>
            <div className="profile__nav-discover">
              <img src={discover} alt="discover" />
            </div>
          </div>
          <div className="profile__header">
            <div className="profile__head">
              <div className="profile__head-pfp-container">
                {profile.pfp == "" ? (
                  <img
                    className="profile__head-pfp"
                    src={profilePic}
                    alt="user pfp"
                  />
                ) : (
                  <Image
                    className="profile__head-pfp"
                    cloudName="dxyxmfpoh"
                    publicId={profile.pfp}
                  />
                )}
              </div>
              <div className="profile__head-func">
                <div className="profile__head-heading">
                  <div className="profile__head-title">
                    <div className="profile__head-handle">{profile.handle}</div>
                  </div>
                </div>
                <div className="profile__head-actions">
                  <button className="profile__head-msg">Message</button>

                  {!isFollowing && (
                    <button
                      className="profile__head-follow"
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  )}

                  {isFollowing && (
                    <button
                      className="profile__head-unfollow"
                      onClick={handleUnfollow}
                    >
                      <img src={unfollow} />
                    </button>
                  )}

                  <button className="profile__head-more">
                    <img
                      className="profile__head-more-img"
                      src={more}
                      alt="more"
                    />
                  </button>
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
            <div className="profile__stats-followers" onClick={handleFollowers}>
              <div className="profile__stats-followers-num">
                {numFollowers()}
              </div>
              {numFollowers() != 1 ? "followers" : "follower"}
            </div>
            <div className="profile__stats-following" onClick={handleFollowing}>
              <div className="profile__stats-following-num">{numFollows()}</div>
              following
            </div>
          </div>

          <div className="profile__post-nav">
            <div className="profile__post-nav-gallary">
              <img src={gallary} alt="gallary" />
            </div>
            <div className="profile__post-nav-feed">
              <img
                className="profile__post-nav-feed-img"
                src={feed}
                alt="feed"
              />
            </div>
            <div className="profile__post-nav-saved">
              <img src={save} alt="save" />
            </div>
            <div className="profile__post-nav-foryou">
              <img src={foryou} alt="foryou" />
            </div>
          </div>

          <div className="profile__posts">{displayPosts()}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
