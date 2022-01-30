import React from 'react'
import { Redirect, Route, useLocation } from "react-router-dom";
import routes from "../helpers/routes";

export default function PrivateRoute({ hasRole: role, ...rest }) {
  const location = useLocation();

  const { isLogged } = localStorage.getItem("isLogged")

  //if (role && !hasRole(role)) return <Redirect to={routes.home} />;

  if (!isLogged())
    return (
      <Redirect to={{ pathname: routes.login, state: { from: location } }} />
    );
  return <Route {...rest} />;
}
