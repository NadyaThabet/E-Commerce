import React, { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import Login from "../Login/Login";

export default function ChildrenProtectedRoute({ children }) {
  const { userIsLoggedIn } = useContext(authContext);

  return <div>{userIsLoggedIn ? children : <Login />}</div>;
}
