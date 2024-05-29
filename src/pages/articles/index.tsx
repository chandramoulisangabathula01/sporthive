import React, { Suspense } from "react";
const ArticleList = React.lazy(() => import("./ArticleList"));
import ErrorBoundary from "../../components/ErrorBoundary";
import { Outlet } from "react-router-dom";

const Articles: React.FC = () => {
    return (
        <>
            <ErrorBoundary>
            <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
                    <ArticleList />
                    </Suspense>
            </ErrorBoundary>
            <Outlet/>
        </>
    )
};

export default Articles