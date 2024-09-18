// import { createBrowserRouter, Navigate } from "react-router-dom";
// import Signin from "../pages/signin";
// import LandingPage from "../pages/LandingPage";
// import NotFound from "../pages/NotFound";
// import Signup from "../pages/signup";
// import Articles from "../pages/articles";
// import Logout from "../pages/logout";
// import ProtectedRoute from "./ProtectedRoute";
// import MatchList from "../pages/matches/Matchslist";
// import TeamAndSportList from "../pages/sports/SportList";
// import UserInfo from "../pages/UserInfo";



// const ifLog = () => {
//     const authToken = localStorage.getItem("authToken");
//     return !!authToken;
// };

// const renderLandingComponent = () => {
//     return ifLog() ? <Navigate to="/landingpage" replace /> : <LandingPage />;
// };

// const router = createBrowserRouter([
//     {
//         path: "/signin",
//         element: <Signin />
//     },
//     {
//         path: "/signup",
//         element: <Signup />
//     },
//     {
//         path: "/logout",
//         element: <Logout />
//     },
//     {
//         path: "/",
//         element: renderLandingComponent()
//     },
    
//     {
//         path: "/articles",
//         element: <Articles />
//     },
//     {
//         path: '/matches',
//         element: (
//             <ProtectedRoute>
//                 <MatchList />
//             </ProtectedRoute>
//         ),
//     },
    

//     {
//          path: "/landingpage", element: <LandingPage /> },

    
//     {
//         path: "/user",
//         element: (
//             <ProtectedRoute>
//                 <UserInfo />
//             </ProtectedRoute>
//         ),
//     },
//     {
//         path: "*",
//         element: <NotFound />
//     },
//     { path: '/teams', element: <TeamAndSportList /> }
    

// ]);
// export const RoutePaths = {
//     LandingPage: "/landingpage",
  
// };
// export default router;


import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Lazy load components
const Signin = React.lazy(() => import("../pages/signin"));
const LandingPage = React.lazy(() => import("../pages/LandingPage"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Signup = React.lazy(() => import("../pages/signup"));
const Articles = React.lazy(() => import("../pages/articles"));
const Logout = React.lazy(() => import("../pages/logout"));
const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const MatchList = React.lazy(() => import("../pages/matches/Matchslist"));
const TeamAndSportList = React.lazy(() => import("../pages/sports/SportList"));
const UserInfo = React.lazy(() => import("../pages/UserInfo"));

// Helper function to check authentication
const ifLog = () => {
    const authToken = localStorage.getItem("authToken");
    return !!authToken;
};

// Render Landing Component based on login status
const renderLandingComponent = () => {
    return ifLog() ? <Navigate to="/landingpage" replace /> : <LandingPage />;
};

// Define fallback UI for Suspense
const FallbackLoader = () => <div>Loading...</div>;

const router = createBrowserRouter([
    {
        path: "/signin",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <Signin />
            </Suspense>
        ),
    },
    {
        path: "/signup",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <Signup />
            </Suspense>
        ),
    },
    {
        path: "/logout",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <Logout />
            </Suspense>
        ),
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                {renderLandingComponent()}
            </Suspense>
        ),
    },
    {
        path: "/articles",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <Articles />
            </Suspense>
        ),
    },
    {
        path: "/matches",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <ProtectedRoute>
                    <MatchList />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "/landingpage",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <LandingPage />
            </Suspense>
        ),
    },
    {
        path: "/user",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <ProtectedRoute>
                    <UserInfo />
                </ProtectedRoute>
            </Suspense>
        ),
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <NotFound />
            </Suspense>
        ),
    },
    {
        path: "/teams",
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <TeamAndSportList />
            </Suspense>
        ),
    },
]);

export const RoutePaths = {
    LandingPage: "/landingpage",
};

export default router;
