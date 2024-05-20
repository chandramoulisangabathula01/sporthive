import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom"

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
  }, [])
  
  return <Navigate to="/landingpage" />;
}

export default Logout;