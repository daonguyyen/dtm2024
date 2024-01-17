import React, { useContext, useEffect, useState } from "react";
import "./topbarcustom.scss";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/home/logo.png";
import { AuthContext } from "../../context/authContext/authContext";
import avatarDefault from "../../../assets/images/icon/man.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const TopBarCustom = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleMenuClick = (sectionId) => {
    // const targetSection = document.getElementById(sectionId);
    // if (targetSection) {
    //   targetSection.scrollIntoView({
    //     behavior: "smooth",
    //   });
    //   setActiveSection(sectionId);
    // }
    // setOpenMenu(false);
    history.push("/");
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll(".section");
    let currentSectionId = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 50 && rect.bottom >= 50) {
        currentSectionId = section.id;
      }
    });

    setActiveSection(currentSectionId);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header bg-header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="logo image" />
        </Link>
        <div
          className="nav__menu"
          id="nav-menu"
          style={{ top: openMenu ? "0" : "" }}
        >
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                onClick={() => handleMenuClick("home")}
                className={
                  activeSection === "home"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Home
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#about"
                onClick={() => handleMenuClick("about")}
                className={
                  activeSection === "about"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                About Us
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#services"
                onClick={() => handleMenuClick("services")}
                className={
                  activeSection === "services"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Services
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#industry"
                onClick={() => handleMenuClick("industry")}
                className={
                  activeSection === "industry"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Industry Sectors
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#project"
                onClick={() => handleMenuClick("project")}
                className={
                  activeSection === "project"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Project
              </a>
            </li>
            <li className="nav__item" onClick={() => setOpenMenu(false)}>
              <Link to="/posts" className="nav__link">
                Posts
              </Link>
            </li>
            {currentUser && (
              <li className="nav__item" onClick={() => setOpenMenu(false)}>
                <Link to="/write" className="nav__link">
                  Write Post
                </Link>
              </li>
            )}

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

            <li className="nav__item">
              {currentUser ? (
                <a
                  href=""
                  className="nav__link"
                  onClick={handleLogout}
                  title="Log out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H7M14 15L19 10M19 10L14 5M19 10H7"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ) : (
                <Link to="/login" className="nav__link nav__btn">
                  Login
                </Link>
              )}
            </li>
          </ul>

          {/* Close button  */}
          <div
            className="nav__close"
            id="nav-close"
            onClick={() => setOpenMenu(false)}
          >
            <i className="ri-close-line"></i>
          </div>
        </div>
        <div className="nav__buttons">
          {/* <!-- Theme change button  --> */}
          {/* <i className="ri-moon-line" id="theme-button"></i> */}

          {/* <!-- Toggle button  --> */}
          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setOpenMenu(true)}
          >
            <i className="ri-apps-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopBarCustom;
