import React, { useState } from "react";
import Axios from "axios";

const UploadAudio = ({ hide, setHide }) => {
  const [state, setState] = useState({ name: "", media: "" });
  const [alert, setAlert] = useState({
    message: "",
    color: "red",
    loading: false,
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      case "media":
        setState({ ...state, media: e.target.files[0] });
        break;
      default:
        setState({ ...state, [e.target.name]: e.target.value });
    }
    setAlert({ ...alert, message: "" }); //Remove error message when user is typing
  };
  console.log(state);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    const { name, media } = state;
    if (!name || !media) {
      setAlert({ ...alert, message: "Please fill all fields" });
    }
    const formData = new FormData();
    formData.append("media", media);
    formData.append("name", name);
    Axios.post("https://gcsound-vault.herokuapp.com/audio", formData)
      .then((res) => {
        setAlert({
          ...alert,
          loading: false,
          message: res.data.message,
          color: "green",
        }); //alert with response message
        setState({ ...state, name: "", media: "" });
      })
      .catch((err) => {
        setAlert({
          ...alert,
          message: err.response.data.message,
          color: "red",
          loading: false,
        }); //alert with response message
      });
  };
  return (
    <div className={hide ? "hide" : "form-area"}>
      <form onSubmit={handleSubmit} className="form-area form-area_form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={state.name}
          placeholder="Name your file"
          onChange={handleChange}
          required
        />
        <label htmlFor="media">Choose file(Not more than 5mb)</label>
        <input
          type="file"
          name="media"
          id="media"
          accept="audio/*"
          onChange={handleChange}
          required
        />
        <p style={{ color: alert.color }} className="form-area_alert">
          {alert.message}
        </p>
        <button type="submit" className="btn">
          {alert.loading ? "Uploading" : "Upload"}
        </button>
        <button className="btn" onClick={() => setHide(true)}>
          Close
        </button>
      </form>
    </div>
  );
};

export default UploadAudio;
