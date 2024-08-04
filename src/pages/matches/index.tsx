import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
// import MatchList from "./Matchslist";
const MatchList = React.lazy(() => import("./Matchslist"));
import ErrorBoundary from "../../components/ErrorBoundary";
// import MatchList from "./Matchslist";


const Matches: React.FC = () => {
    return (
        <>
            <ErrorBoundary>
            <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
                    <MatchList />
                    </Suspense>
            </ErrorBoundary>
            <Outlet/>
        </>
    )
};

export default Matches;