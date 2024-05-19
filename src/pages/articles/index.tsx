import React from "react";
const ArticleList = React.lazy(() => import("./ArticleList"));
import ErrorBoundary from "../../components/ErrorBoundary";
import { Outlet } from "react-router-dom";

const Articles: React.FC = () => {
    return (
        <>
            <ErrorBoundary>
                    <ArticleList />
            </ErrorBoundary>
            <Outlet/>
        </>
    )
};

export default Articles