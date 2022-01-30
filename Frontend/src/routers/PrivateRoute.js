import React from 'react'
import { Redirect, Route, useLocation } from "react-router-dom";
import routes from "../helpers/routes";

export default function PrivateRoute({ hasRole: role, ...rest }) {
  const location = useLocation();

  const  isLogged  = localStorage.getItem("isLogged")
  const Rol = localStorage.getItem("Rol")

  if (Rol ===("61f6a6a1a7f6af818d6bfdb0")) return <Redirect to={routes.users.admin} />;
  
  if (!isLogged())
    return (
      <Redirect to={{ pathname: routes.login, state: { from: location } }} />
    );
  return <Route {...rest} />;
  
}
