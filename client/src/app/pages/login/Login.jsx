import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext/authContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(AuthContext);

  const [err, setError] = useState(null);
  const history = useHistory();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailRef.current.value === "" && passwordRef.current.value === "") {
      setError("Please enter email or password.");
    } else {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          process.env.REACT_APP_API_URL + "/auth/login",
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        history.push("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(err.response.data);
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form action="" className="loginForm">
        <label>Email</label>
        <input
          name="email"
          type="text"
          className="loginInput"
          placeholder="Enter your email ..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          className="loginInput"
          placeholder="Enter your password ..."
          ref={passwordRef}
        />
        {err && <p className="loginMessage">{err}</p>}
        <button className="loginButton" onClick={handleSubmit}>
          Login
        </button>
      </form>
      {/* <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button> */}
    </div>
  );
};

export default Login;
