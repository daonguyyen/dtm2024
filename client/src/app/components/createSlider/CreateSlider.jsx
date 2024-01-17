import React, { useContext, useState } from "react";
import "./createslider.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext/authContext";
import DefaultImg from "../../../assets/images/icon/no-img.png";

const CreateSlider = ({ onClose, onPostCreated }) => {
  const [desc, setDesc] = useState("");
  const [shortName, setShortName] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [img, setImg] = useState(null);

  const { currentUser, dispatch } = useContext(AuthContext);

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

  const handleSave = async (e) => {
    e.preventDefault();

    const newProject = {
      shortName,
      name,
      desc,
    };

    if (img) {
      const imgUrl = await upload();
      newProject.logo = imgUrl;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/sliders",
        newProject,
        {
          headers: { token: "Bearer " + currentUser.accessToken },
        }
      );
      window.location.reload();
    } catch (err) {
      if (err.response.status === 403) {
        dispatch({ type: "LOGOUT" });
      } else {
        console.log(err);
      }
    }

    // Đóng popup
    onClose();

    // Thông báo rằng bài viết đã được tạo
    onPostCreated();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add Project</h2>
        <div className="form-group">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setImg(e.target.files[0])}
          />

          {img ? (
            <img
              className="customer__avatar"
              src={URL.createObjectURL(img)}
              alt=""
            />
          ) : (
            <img className="customer__avatar" src={DefaultImg} alt="" />
          )}

          <label className="file" htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M23 17.0001V21.0001C23 21.5306 22.7893 22.0393 22.4142 22.4143C22.0391 22.7894 21.5304 23.0001 21 23.0001H7C6.46957 23.0001 5.96086 22.7894 5.58579 22.4143C5.21071 22.0393 5 21.5306 5 21.0001V17.0001M19 10.0001L14 5.00012M14 5.00012L9 10.0001M14 5.00012V17.0001"
                stroke="#0188d0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            Upload Logo
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="shortname">Nhập viết tắt của Dự án</label>
          <input
            id="shortname"
            type="text"
            value={shortName}
            autoFocus={true}
            onChange={(e) => setShortName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nhập mô tả ngắn của Dự án</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Nhập mô tả Dự án</label>
          <textarea
            id="desc"
            placeholder="Enter project description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={5}
          />
        </div>

        <button className="btn__add" onClick={handleSave}>
          Save
        </button>
        <button className="btn__cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateSlider;
