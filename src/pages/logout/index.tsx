import React from "react";
import { Navigate } from "react-router-dom"
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
  }, [])
  
  return <Navigate to="/landingpage" />;
}

export default Logout;