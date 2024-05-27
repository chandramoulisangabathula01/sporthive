



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAuthCheck from '../hooks/userAuthCheck';
import PreferencesPanel from './preferences/PreferencesScreen';

const Navbar: React.FC = () => {
    // const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isPreferencesList, setPreferencesList] = useState(false);
    const ifLog = userAuthCheck();

    // const toggleDropdown = () => {
    //     setDropdownOpen(!isDropdownOpen);
    // };

    const togglePreferencesList = () => {
        setPreferencesList(!isPreferencesList);
    };

    return (
        <nav className="border-b border-gray-500 px-20 py-6 bg-gray-900 text-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/landingpage" className="text-4xl font-bold">
                        SportHive
                    </Link>
                </div>
                <div className="flex space-x-6 items-center">
                    {ifLog && (
                        <button
                            onClick={togglePreferencesList}
                            className="hover:bg-gray-800 border border-gray-800 justify-center items-center px-4 py-3 rounded transition duration-300"
                        >
                            Preferences
                        </button>
                    )}
                    <Link to="/landingpage" className="hover:bg-gray-800 border border-gray-800 justify-center items-center px-4 py-3 rounded transition duration-300">
                        Home
                    </Link>
                    <Link to="/articles" className="hover:bg-gray-800 border border-gray-800 justify-center items-center px-4 py-3 rounded transition duration-300">
                        Articles
                    </Link>
                    <Link to="/matches" className="hover:bg-gray-800 border border-gray-800 justify-center items-center px-4 py-3 rounded transition duration-300">
                        Matches
                    </Link>
                    <Link
                        to="/logout"
                        className="block border border-gray-800 justify-center items-center px-4 py-3 text-sm text-white hover:bg-gray-700"
                    >
                        Logout
                    </Link>
                </div>
            </div>
            
            {isPreferencesList && <PreferencesPanel />}
        </nav>
    );
};

export default Navbar;
