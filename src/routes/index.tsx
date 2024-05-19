import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Signup from "../pages/signup";
import Articles from "../pages/articles";


const ifLog = () => {
    const authToken = localStorage.getItem("authToken");
    return !!authToken;
};

const renderLandingComponent = () => {
    return ifLog() ? <Navigate to="/landingpage" replace /> : <LandingPage />;
};

const router = createBrowserRouter([
    {
        path: "/signin", 
        element: <Signin />
    },
    {
        path: "/signup", 
        element: <Signup />
    },
    { 
        path: "/", 
        element: renderLandingComponent()
    },
    { path: "/landingpage", 
        element: <LandingPage />
    },
    { path: "/articles", 
        element: <Articles />
    },
    { path: "*",
        element: <NotFound />
    },
    
]);

export default router;