import React, { useState } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import UploadAudio from "./UploadAudio";

const Header = (props) => {
  const [hide,setHide] = useState(true);
  const logout = () => {
    localStorage.clear();
    delete Axios.defaults.headers.common["authorization"];
    props.history.push("/signin");
  };
  if (localStorage.isAuthenticated) {
    return (
      <header className="header">
        <div className="header_dashboard">
          <h1> Sound Vault </h1>
          <p onClick={logout}>Logout</p>
        </div>
        <button className="btn" id="header_btn" onClick={()=>setHide(false)}>
          Add new sound
        </button>
        <UploadAudio hide={hide} setHide={setHide}/>
      </header>
    );
  } else {
    return (
      <header className="header">
        <h1> Sound Vault </h1>
        <h2>Best place to store your sound bites</h2>
      </header>
    );
  }
};

export default withRouter(Header);
