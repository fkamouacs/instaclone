import logo from "../assets/logo.png";
import photo from "../assets/photo.svg";
import msg from "../assets/msg.svg";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav__photo">
        <a className="nav__photo-link" href="/photo">
          <img className="icon" src={photo} alt="photo button" />
        </a>
      </div>
      <div className="nav__logo">
        <a className="nav__logo-link" href="/">
          <img className="nav__logo-img" src={logo} alt="instagram" />
        </a>
      </div>
      <div className="nav__msg">
        <a className="nav__msg-link" href="/msg">
          <img className="icon" src={msg} alt="msg" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
