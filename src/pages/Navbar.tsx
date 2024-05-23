
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAuthCheck from '../hooks/userAuthCheck';


const Navbar: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const ifLog = userAuthCheck();
    

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    
    return (
        <nav className="border-b border-gray-500 px-20 py-6 bg-gray-900 text-white">
            
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/landingpage" className="text-4xl font-bold">
                        Sports Hive
                    </Link>
                </div>
                <div className="flex space-x-6 items-center">


                    <Link to="/landingpage" className="hover:bg-gray-800  border border-gray-800 justigy-center item-center px-4 py-3 rounded transition duration-300">Home</Link>
                    <Link to="/articles" className="hover:bg-gray-800 border border-gray-800 justigy-center item-center px-4 py-3 rounded transition duration-300">Articles</Link>
                    <Link to="/matches" className="hover:bg-gray-800 border border-gray-800 justigy-center item-center px-4 py-3 rounded transition duration-300">Matches</Link>
                    

                    {ifLog ? (
                        <div className="relative inline-block" tabIndex={0}>
                            <button
                                onClick={toggleDropdown}
                                onBlur={() => setDropdownOpen(false)}
                                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" ${isDropdownOpen ? 'focus:ring focus:ring-gray-400' : ''} id="menu-button" aria-expanded="true" aria-haspopup="true`}
                            > Options
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <div
                                className={`origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 transition transform duration-300 ease-in-out ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                            >
                                <div className="py-1">
                                    <Link
                                        to="/signup"
                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                    >
                                        Profile
                                    </Link>

                                    <hr className="border-gray-600" />

                                    <Link
                                        to="/logout"
                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/signin" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Sign In</Link>

                            <Link to="/signup" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Sign Up</Link>
                        </>
                    )}
                    <Link
                        to="/logout"
                        className="block border border-gray-800 justigy-center item-center  px-4 py-3 text-sm text-white hover:bg-gray-700"
                    >
                        Logout
                    </Link>
                </div>
            </div>
            
        </nav>
    );
};

export default Navbar;


