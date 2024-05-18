import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import ErrorBoundary from "../components/ErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
// import SigninForm from "../pages/signin/SigninForm";

const router = createBrowserRouter([
    {
        path: "/signin", 
        element: <Signin />
    },
    { path: "/", element:<Home />  },
    { path: "/home", element: <Home /> },
    
    // ErrorBoundary: () => <>Failed to load the page</>,
]);

export default router;