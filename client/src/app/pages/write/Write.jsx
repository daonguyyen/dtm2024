import axios from "axios";
import "./write.scss";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/authContext/authContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Write = () => {
  const { state } = useLocation();
  const { currentUser, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ direction: "rtl" }],
    ["link", "image"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  const [value, setValue] = useState(state?.post.desc || "");
  const [title, setTitle] = useState(state?.post.title || "");
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.post.categories || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/upload",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const newPost = {
      username: currentUser.username,
      title,
      desc: value,
      // photo: imgUrl,
      categories: cat,
    };

    if (img) {
      const imgUrl = state?.post.photo ? state?.post.photo : await upload();
      newPost.photo = imgUrl;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/posts",
        newPost,
        {
          headers: { token: "Bearer " + currentUser.accessToken },
        }
      );
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      if (err.response.status === 403) {
        dispatch({ type: "LOGOUT" });
      } else {
        console.log(err);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    const body = {
      username: currentUser.username,
      title,
      desc: value,
      photo: imgUrl,
      categories: cat,
    };
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/${state?.post._id}`,
        body,
        {
          headers: { token: "Bearer " + currentUser.accessToken },
        }
      );
      history.push("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const back = () => {
    history.push("/posts");
  };

  return (
    <div className="add container">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="writeInput"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editContainer">
          <ReactQuill
            modules={module}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "Data Mining"}
              name="cat"
              value="Data Mining"
              id="data-mining"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="data-mining">Data Mining</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "Data Analytics"}
              name="cat"
              value="Data Analytics"
              id="data-analytics"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="data-analytics">Data Analytics</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "Data Storytelling"}
              name="cat"
              value="Data Storytelling"
              id="data-stroytelling"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="data-stroytelling">Data Storytelling</label>
          </div>
        </div>
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            {state && <button onClick={back}>Cancel update</button>}

            {state ? (
              <button onClick={handleUpdate}>Update</button>
            ) : (
              <button onClick={handleClick}>Publish</button>
            )}
          </div>
        </div>
      </div>
    </div>

    // <div className="write">
    //   <img src="https://placehold.co/1000x300" alt="" className="writeImg" />
    //   <form className="writeForm">
    //     <div className="writeFormGroup">
    //       <label htmlFor="fileInput">
    //         <svg
    //           className="writeIcon"
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="29"
    //           height="29"
    //           viewBox="0 0 29 29"
    //           fill="none"
    //         >
    //           <path
    //             d="M14.5986 10.2008V18.2008M10.5986 14.2008H18.5986M24.5986 14.2008C24.5986 19.7237 20.1215 24.2008 14.5986 24.2008C9.07579 24.2008 4.59863 19.7237 4.59863 14.2008C4.59863 8.67796 9.07579 4.20081 14.5986 4.20081C20.1215 4.20081 24.5986 8.67796 24.5986 14.2008Z"
    //             stroke="black"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //           />
    //         </svg>
    //       </label>
    //       <input
    //         type="file"
    //         name=""
    //         id="fileInput"
    //         style={{ display: "none" }}
    //         onChange={e => setImg(e.target.files[0])}
    //       />
    //       <input
    //         type="text"
    //         placeholder="Title"
    //         className="writeInput"
    //         autoFocus={true}
    //         onChange={e => setTitle(e.target.value)}
    //       />
    //     </div>

    //     <div className="writeFormGroup">
    //       <ReactQuill
    //         modules={module}
    //         theme="snow"
    //         value={value}
    //         onChange={setValue}
    //       />
    //     </div>
    //     <button className="writeSubmit">Publish</button>
    //   </form>
    // </div>
  );
};

export default Write;
