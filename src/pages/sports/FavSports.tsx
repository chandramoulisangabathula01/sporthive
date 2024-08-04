import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const SportList = React.lazy(() => import("./SportList"));



const FavSport: React.FC = () => {
    return (
        <>
            <ErrorBoundary>
                <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
                    <SportList />
                </Suspense>
            </ErrorBoundary>
        </>
    )
};

export default FavSport;