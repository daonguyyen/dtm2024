import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./slider.scss";
import DOMPurify from "dompurify";
import DefaultImg from "../../../assets/images/icon/no-img.png";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";
export default function Slider({ slider, onDelete }) {
  const { currentUser } = useContext(AuthContext);

  const PF = "http://api.datamind.vn/uploads/";

  const handleDelete = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + `/sliders/${slider._id}`,
        {
          headers: { token: "Bearer " + currentUser.accessToken },
        }
      );
      window.location.reload();
      // onDelete();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="customer__block customer__block--1">
      <div className="customer__detail">
        {slider.logo ? (
          <img src={PF + slider.logo} className="customer__avatar" alt="" />
        ) : (
          <img src={DefaultImg} className="customer__avatar" alt="" />
        )}

        <span>{slider.shortName}</span>
        <p>{slider.name}</p>
        <h3>{slider.desc}</h3>
      </div>
      {currentUser && (
        <span className="btn__delete" onClick={handleDelete} title="Delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M20 8L8 20M8 8L20 20"
              stroke="red"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
