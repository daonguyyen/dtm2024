import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/register",
        inputs
      );
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form action="" className="registerForm">
        <label>Username</label>
        <input
          type="text"
          name="username"
          className="registerInput"
          placeholder="Enter your username ..."
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="registerInput"
          placeholder="Enter your email ..."
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="registerInput"
          placeholder="Enter your password ..."
          onChange={handleChange}
        />
        <button className="registerButton" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
