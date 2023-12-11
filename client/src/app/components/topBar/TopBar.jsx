import React, { useContext } from "react";
import "./topbar.scss";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/home/logo.png";
import { AuthContext } from "../../context/authContext/authContext";
import avatarDefault from "../../../assets/images/icon/man.png";

const TopBar = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className="header bg-header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="logo image" />
        </Link>
        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link to="/posts" className="nav__link">
                Figure out
              </Link>
            </li>
            {currentUser && (
              <li className="nav__item">
                <Link to="/write" className="nav__link">
                  Write Post
                </Link>
              </li>
            )}

            <li className="nav__item">
              {currentUser ? (
                <span className="nav__link nav__btn" onClick={handleLogout}>
                  Logout
                </span>
              ) : (
                <Link to="/login" className="nav__link nav__btn">
                  Login
                </Link>
              )}
            </li>
            <li className="nav__item">
              {currentUser && (
                <Link to="/profile">
                  <img
                    className="topImg"
                    src={
                      currentUser.profilePic
                        ? `../upload/${currentUser.profilePic}`
                        : avatarDefault
                    }
                    alt=""
                  />
                </Link>
              )}
            </li>
          </ul>

          {/* Close button  */}
          <div className="nav__close" id="nav-close">
            <i className="ri-close-line"></i>
          </div>
        </div>
        <div className="nav__buttons">
          {/* <!-- Theme change button  --> */}
          {/* <i className="ri-moon-line" id="theme-button"></i> */}

          {/* <!-- Toggle button  --> */}
          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-apps-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBar;
