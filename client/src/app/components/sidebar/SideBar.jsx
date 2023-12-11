import { useEffect, useState } from "react";
import "./sidebar.scss";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Logo from "../../../assets/images/home/logo.png";

const SideBar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/categories"
      );
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sideBar">
      <div className="sideBarItem">
        <span className="sideBarTitle">About Us</span>
        <img src={Logo} alt="" />
        <p>
          Giúp doanh nghiệp và tổ chức khai thác sức mạnh của dữ liệu để đưa ra
          quyết định thông minh.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">Categories</span>
        <ul className="sideBarList">
          {cats.map((c, index) => (
            <Link key={index} to={`/posts/?cat=${c.name}`} className="link">
              <li key={c.index} className="sidebarItem">
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
