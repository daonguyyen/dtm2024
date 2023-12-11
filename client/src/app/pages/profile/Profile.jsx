import { useContext, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { AuthContext } from "../../context/authContext/authContext";
import "./profile.scss";
import avatarDefault from "../../../assets/images/icon/man.png";
import axios from "axios";
import Dialog from "../../components/dialog/Dialog";

export default function Profile() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [img, setImg] = useState(null);

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [errImg, setErrImg] = useState(false);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const updatePass = (e) => {
    setPassword(e);
    setErr(false);
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const upload = async () => {
    console.log(img);
    if (img === null) {
      setErrImg(true);
    } else {
      try {
        const formData = new FormData();
        formData.append("file", img);
        const res = await axios.post(
          process.env.REACT_APP_API_URL + "/upload",
          formData
        );
        const updatedUser = {
          userId: currentUser._id,
          username: currentUser.username,
          email: currentUser.email,
          profilePic: res.data,
        };
        dispatch({ type: "UPDATE_START" });
        try {
          const res = await axios.put(
            process.env.REACT_APP_API_URL + "/users/" + currentUser._id,
            updatedUser,
            {
              headers: { token: "Bearer " + currentUser.accessToken },
            }
          );
          setSuccess(true);
          setErrImg(false);
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
          dispatch({ type: "UPDATE_FAILURE" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (choose) => {
    // e.preventDefault();
    if (choose) {
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        password,
      };
      if (img) {
        const imgUrl = await upload();
        updatedUser.profilePic = imgUrl;
      }

      try {
        const res = await axios.put(
          process.env.REACT_APP_API_URL + "/users/" + currentUser._id,
          updatedUser,
          {
            headers: { token: "Bearer " + currentUser.accessToken },
          }
        );
        setSuccess(true);
        handleDialog("", false);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        dispatch({ type: "LOGOUT" });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } else {
      handleDialog("", false);
    }
  };

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleChange = () => {
    if (password === "") {
      setErr(true);
    } else {
      handleDialog("Are you sure you want to change?", true);
    }
  };
  return (
    <div className="profile container">
      <div className="profileWrapper">
        <div className="profileTitle">
          <span className="profileUpdateTitle">Hi, {currentUser.username}</span>
          {/* <span className="profileDeleteTitle">Delete Account</span> */}
        </div>
        <form action="" className="profileForm">
          <label>Profile Picture</label>
          <div className="profilePP">
            <img
              // src={img ? URL.createObjectURL(img) : avatarDefault}
              src={
                currentUser.profilePic
                  ? `../upload/${currentUser.profilePic}`
                  : avatarDefault
              }
              alt=""
            />
            {/* <label htmlFor="fileInput" title="Upload your avatar">
              <svg
                className="profilePPIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M25.9844 21.6077C25.9844 22.1381 25.7737 22.6468 25.3986 23.0219C25.0235 23.397 24.5148 23.6077 23.9844 23.6077H5.98438C5.45394 23.6077 4.94523 23.397 4.57016 23.0219C4.19509 22.6468 3.98438 22.1381 3.98438 21.6077V10.6077C3.98438 10.0772 4.19509 9.56853 4.57016 9.19345C4.94523 8.81838 5.45394 8.60767 5.98438 8.60767H9.98438L11.9844 5.60767H17.9844L19.9844 8.60767H23.9844C24.5148 8.60767 25.0235 8.81838 25.3986 9.19345C25.7737 9.56853 25.9844 10.0772 25.9844 10.6077V21.6077Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.9844 19.6077C17.1935 19.6077 18.9844 17.8168 18.9844 15.6077C18.9844 13.3985 17.1935 11.6077 14.9844 11.6077C12.7752 11.6077 10.9844 13.3985 10.9844 15.6077C10.9844 17.8168 12.7752 19.6077 14.9844 19.6077Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <input
              type="file"
              name=""
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setImg(e.target.files[0])}
            /> */}
          </div>
          {errImg && (
            <span className="settingErr">Please choose a picture</span>
          )}
          {/* <span className="profileSubmit" onClick={upload}>
            Update avatar
          </span> */}
          {/* <label className="formLabel">Username</label>
          <input
            type="text"
            value={currentUser.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="formLabel">Email</label>
          <input
            type="text"
            value={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <div className="formGroup">
            <label className="formLabel">Update your password</label>
            <div className="formInput">
              <input
                className="settingInput"
                type={showPassword ? "text" : "password"}
                onChange={(e) => updatePass(e.target.value)}
              />
              <span onClick={() => handleCheckboxChange()}>
                {showPassword ? (
                  <svg
                    className="profileIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M16.6073 16.8167C16.3327 17.1114 16.0015 17.3478 15.6335 17.5118C15.2655 17.6757 14.8682 17.7639 14.4654 17.771C14.0626 17.7781 13.6625 17.704 13.2889 17.5531C12.9154 17.4023 12.576 17.1777 12.2912 16.8928C12.0063 16.6079 11.7817 16.2686 11.6308 15.895C11.4799 15.5215 11.4058 15.1214 11.4129 14.7186C11.42 14.3158 11.5082 13.9185 11.6722 13.5505C11.8361 13.1825 12.0726 12.8513 12.3673 12.5767M3.4873 3.69666L25.4873 25.6967M20.4273 20.6367C18.7179 21.9397 16.6364 22.6615 14.4873 22.6967C7.4873 22.6967 3.4873 14.6967 3.4873 14.6967C4.73119 12.3786 6.45644 10.3533 8.5473 8.75666L20.4273 20.6367ZM12.3873 6.93666C13.0756 6.77554 13.7804 6.69499 14.4873 6.69666C21.4873 6.69666 25.4873 14.6967 25.4873 14.6967C24.8803 15.8323 24.1564 16.9014 23.3273 17.8867L12.3873 6.93666Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="profileIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M3.4873 14.6967C3.4873 14.6967 7.4873 6.69666 14.4873 6.69666C21.4873 6.69666 25.4873 14.6967 25.4873 14.6967C25.4873 14.6967 21.4873 22.6967 14.4873 22.6967C7.4873 22.6967 3.4873 14.6967 3.4873 14.6967Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.4873 17.6967C16.1442 17.6967 17.4873 16.3535 17.4873 14.6967C17.4873 13.0398 16.1442 11.6967 14.4873 11.6967C12.8305 11.6967 11.4873 13.0398 11.4873 14.6967C11.4873 16.3535 12.8305 17.6967 14.4873 17.6967Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            {err && <span className="settingErr">Please enter password</span>}
          </div>
          <span className="profileSubmit" onClick={handleChange}>
            Update password
          </span>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <SideBar />
      {dialog.isLoading && (
        <Dialog onDialog={handleSubmit} message={dialog.message} />
      )}
    </div>
  );
}
