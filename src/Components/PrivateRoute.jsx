import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.isAuthenticated ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
