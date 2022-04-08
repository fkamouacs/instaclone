import { useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import upload from "../assets/upload.svg";
import activity from "../assets/activity.svg";
import profile from "../assets/profile.jpg";

const BttmNavbar = (props) => {
  const navigate = useNavigate();

  const navToProfile = () => {
    navigate(`/${props.user.username}`);
  };

  return (
    <div className="bttmNav">
      <div className="bttmNav__home">
        <a className="bttmNav__home-link" href="/">
          <img className="icon" src={home} alt="home" />
        </a>
      </div>
      <div className="bttmNav__search">
        <a className="bttmNav__search-link" href="/search">
          <img className="icon" src={search} alt="search" />
        </a>
      </div>
      <div className="bttmNav__upload">
        <a className="bttmNav__upload-link" href="/create">
          <img className="icon" src={upload} alt="upload" />
        </a>
      </div>
      <div className="bttmNav__activity">
        <a className="bttmNav__activity-link" href="/activity">
          <img className="icon" src={activity} alt="activity" />
        </a>
      </div>
      <div className="bttmNav__profile">
        <a className="bttmNav__profile-link" onClick={navToProfile}>
          <img className="icon" src={profile} alt="profile" />
        </a>
      </div>
    </div>
  );
};

export default BttmNavbar;
