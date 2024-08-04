import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Signup from "../pages/signup";
import Articles from "../pages/articles";
import Logout from "../pages/logout";
import ProtectedRoute from "./ProtectedRoute";
import MatchList from "../pages/matches/Matchslist";
import TeamAndSportList from "../pages/sports/SportList";
import UserInfo from "../pages/UserInfo";



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
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/",
        element: renderLandingComponent()
    },
    
    {
        path: "/articles",
        element: <Articles />
    },
    {
        path: '/matches',
        element: (
            <ProtectedRoute>
                <MatchList />
            </ProtectedRoute>
        ),
    },
    {
        path: "/user",
        element: (
            <ProtectedRoute>
                <UserInfo />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <NotFound />
    },
    { path: '/teams', element: <TeamAndSportList /> },

]);
export const RoutePaths = {
    LandingPage: "/landingpage",
    Dashboard: "/dashboard"
};
export default router;