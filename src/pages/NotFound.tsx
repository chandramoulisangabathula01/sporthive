import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page does not exist.</p>
      <Link to="/landingpage">
        <button id="backToHomeButton" className="bg-green-700  py-3 px-5 text-white rounded-lg hover:bg-green-600 mb-4 ">Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Notfound;