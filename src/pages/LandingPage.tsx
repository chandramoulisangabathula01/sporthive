import React from "react";
import Articles from "./articles";
import Navbar from "./Navbar";

const LandingPage: React.FC = () => {
    return (

        <div>
            <Navbar />
            <div>
                <Articles />
            </div>
        </div>
    )
}

export default LandingPage;