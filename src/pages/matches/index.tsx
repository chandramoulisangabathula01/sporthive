import React from "react";
import { Outlet } from "react-router-dom";
import MatchList from "./Matchslist";
import ErrorBoundary from "../../components/ErrorBoundary";


const Matches: React.FC = () => {
    return (
        <>
            <ErrorBoundary>
                    <MatchList />
            </ErrorBoundary>
            <Outlet/>
        </>
    )
};

export default Matches;