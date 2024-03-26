import React, { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthProtectedRoute({ children }) {
  const { userIsLoggedIn } = useContext(authContext);

  return <div>{userIsLoggedIn ? <Navigate to={"/home"} /> : children}</div>;
}
