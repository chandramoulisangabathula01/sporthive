import React from "react";
import SportList from "./SportList";
import ErrorBoundary from "../../components/ErrorBoundary";



const FavSport: React.FC = () => {
    return (
        <>  
        <ErrorBoundary>
            <SportList />
        </ErrorBoundary>
        </>
    )
};

export default FavSport;