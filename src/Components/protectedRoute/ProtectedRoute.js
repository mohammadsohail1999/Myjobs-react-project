import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => {
    return {
      user: state.authReducer.user,
    };
  });

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/login"/>;
      }}
    />
  );
};

export default ProtectedRoute;
