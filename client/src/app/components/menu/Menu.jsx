import { useEffect, useState } from "react";
import "./menu.scss";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Menu = ({ cat }) => {
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
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={150}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          libero, quaerat aperiam eaque nulla iusto?
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

export default Menu;
