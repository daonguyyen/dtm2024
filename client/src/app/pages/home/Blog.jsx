import React, { useEffect, useState } from "react";
import "./blog.scss";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SideBar from "../../components/sidebar/SideBar";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import noData from "../../../assets/images/home/no-data.png";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPots = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/posts" + search
      );
      setPosts(res.data);
    };
    fetchPots();
  }, [search]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="blog">
          {posts.length === 0 && (
            <div className="posts noData">
              <img src={noData} alt="" />
            </div>
          )}
          {posts.length > 0 && <Posts posts={posts} />}
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Blog;
