import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

const SignUp = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [alert, setAlert] = useState({ message: "", color: "red" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setAlert({ ...alert, message: "" }); //remove alert when user is typing
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //additional frontend validation
    const { username, email, password, confirm_password } = state;
    if (!username || !email || !password || !confirm_password) {
      setAlert({ ...alert, message: "Please fill all fields" });
      setLoading(false);
    }
    if (password !== confirm_password) {
      setAlert({ ...alert, message: "Passwords do not match" });
      setLoading(false);
    }
    const formData = { username, email, password };
    Axios.post("https://gcsound-vault.herokuapp.com/users/signup", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        Axios.defaults.headers.common["authorization"] = res.data.token; //set token to authorization header
        localStorage.setItem("isAuthenticated", true); // isAuthenticated true to localStorage
        setLoading(false);
        setAlert({ ...alert,color:"green", loading: false, message: res.data.message });
        props.history.push("/"); //redirect to dashboard
      })
      .catch((err) => {
        setAlert({
          ...alert,
          color: "red",
          message: err.response.data.message,
        });
        setLoading(false);
      });
  };
  return (
    <div className="form-area">
      <h3>Sign up to continue</h3>
      <form className="form-area_form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter a unique username"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm password"
          onChange={handleChange}
          required
        />
        <p style={{ color: alert.color }} className="form-area_alert">
          {alert.message}
        </p>
        <button type="submit" className="btn">
          {loading ? "Please wait..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/signin" className="form-area_links">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default withRouter(SignUp);
