import React from "react";
import "./App.css";
import "./Styles/main.scss";
import SignUp from "./Components/SignUp";
import { Switch, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import Axios from "axios";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";

if (localStorage.token) {
  Axios.defaults.headers.common["authorization"] = localStorage.token;
}
function App() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
