import React from "react";
import Articles from "./articles";
import Navbar from "./Navbar";
import LiveMatches from "./matches/LiveMatches";

const LandingPage: React.FC = () => {
    return (

        <div>
            <Navbar />
            <div>
          <LiveMatches/>
        </div>
            <div>
                <Articles />
            </div>
        </div>
    )
}

export default LandingPage;