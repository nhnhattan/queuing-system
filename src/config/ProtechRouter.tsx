import React from "react";
import {useNavigate, Navigate} from "react-router-dom"
const ProtechRouter = () => {
    const navigate = useNavigate()
  const protech = () => {
    let _user = localStorage.getItem("user");
    if (_user === null) {
        <Navigate to="/login" />
    } else {
        <Navigate to="/dashboard" />
    }
  };
  return <div></div>;
};

export default ProtechRouter;
