import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image } from "cloudinary-react";
import back from "../../assets/back.svg";
import pfp from "../../assets/profile.jpg";

const Following = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  const displayFollowing = () => {
    if (location.state._id === props.user._id) {
      return props.user.follows.map((followingId) => {
        return <Follows id={followingId} key={followingId} />;
      });
    } else {
      return location.state.follows.map((followingId) => {
        return <Follows id={followingId} key={followingId} />;
      });
    }
  };

  return (
    <div className="followers">
      <div className="followers__nav">
        <div className="followers__nav-back">
          <img src={back} alt="back" onClick={goBack} />
        </div>
        <div className="followers__nav-title">Following</div>
        <div className="followers__nav-dummy"></div>
      </div>

      <div className="followers__body">{displayFollowing()}</div>
    </div>
  );
};

const Follows = (props) => {
  const location = useLocation();

  const [followerData, setFollowerData] = useState({
    _id: "",
    handle: "",
    pfp: "",
    name: "",
    bio: "",
    followers: [],
    follows: [],
    posts: [],
  });

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:5000/profile/${props.id}`)
        .then((res) => res.json())
        .then((data) => setFollowerData(data));
    };

    fetchData();
    console.log("XD");
  }, []);

  return (
    <div className="follower">
      <div className="follower__content">
        <div className="follower__pfp">
          {followerData.pfp == "" ? (
            <img className="follower__pfp-img" src={pfp} alt="user pfp" />
          ) : (
            <Image
              className="follower__pfp-img"
              cloudName="dxyxmfpoh"
              publicId={followerData.pfp}
            />
          )}
        </div>
        <div className="follower__main">
          <div className="follower__main-title">
            <a
              className="follower__main-handle"
              href={`/${followerData.handle}`}
            >
              {followerData.handle}
            </a>
            <div className="follower__main-seperate">·</div>
            <div className="follower__main-follow">Follow</div>
          </div>
          <div className="follower__main-name">{followerData.name}</div>
        </div>
      </div>

      <button className="follower__remove">Remove</button>
    </div>
  );
};

export default Following;
