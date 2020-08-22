import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

const SignIn = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", color: "red" });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //additional frontend validation
    const { email, password } = state;
    if (!email || !password) {
      setAlert({ ...alert, message: "Please fill all fields" });
      setLoading(false);
    } else {
      const formData = { email, password };
      Axios.post("https://gcsound-vault.herokuapp.com/users/signin", formData)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          Axios.defaults.headers.common["authorization"] = res.data.token; //set token to authorization header
          localStorage.setItem("isAuthenticated", true); // isAuthenticated true to localStorage
          setLoading(false);
          setAlert({
            ...alert,
            color: "green",
            loading: false,
            message: res.data.message,
          });
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
    }
  };

  return (
    <div className="form-area">
      <h3>Sign in to continue</h3>
      <form className="form-area_form" onSubmit={handleSubmit}>
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
        <p style={{ color: alert.color }} className="form-area_alert">
          {alert.message}
        </p>
        <button type="submit" className="btn">
          {loading ? "Please wait..." : "Sign In"}
        </button>
      </form>
      <p>
        New user?{" "}
        <Link to="/signup" className="form-area_links">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default withRouter(SignIn);
