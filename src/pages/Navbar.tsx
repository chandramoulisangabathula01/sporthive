



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userAuthCheck from '../hooks/userAuthCheck';
import PreferencesPanel from './preferences/PreferencesScreen';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'


const Navbar: React.FC = () => {
    const [isPreferencesList, setPreferencesList] = useState(false);
    const ifLog = userAuthCheck();
    const togglePreferencesList = () => {
        setPreferencesList(!isPreferencesList);
    };

    return (
        <nav className="border-b border-gray-400 px-20 py-6 bg-gray-900 text-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/landingpage" className="text-4xl font-bold">
                        SportHive
                    </Link>
                </div>
                <div className="flex space-x-6 items-center">

                    <Link to="/landingpage" className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        Home
                    </Link>
                    <Link to="/articles" className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        Articles
                    </Link>
                    {ifLog && (
                    <Link to="/matches" className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        Matches
                    </Link>
                    )}
                    {ifLog && (
                        <button
                            onClick={togglePreferencesList}
                            className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                                <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                                <path fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                        </button>
                    )}
                    <div className=" top-24  text-righ">
                        <Menu >
                            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                                </svg>

                            </MenuButton>
                            <Transition
                                enter="transition ease-out duration-75"
                                enterFrom="opacity-100 scale-100"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-100 scale-95"
                            >
                                <MenuItems
                                    anchor="bottom end"
                                    className="w-45 mt-6 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                >
                                    {ifLog && (
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-white/30" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0 1 12 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 2a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
                                            <Link
                                                to="/user"
                                            >
                                                User Details
                                            </Link>
                                        </button>
                                    </MenuItem>
                                    )}
                                    {ifLog && (
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-white/30" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5m0 1.9c1.71 0 3.1 1.39 3.1 3.1v2H8.9V6c0-1.71 1.39-3.1 3.1-3.1m.19 7.6c.94 0 1.69.21 2.23.62q.81.63.81 1.68c0 .44-.15.83-.44 1.2c-.29.36-.67.64-1.13.85c-.26.15-.43.3-.52.47c-.09.18-.14.4-.14.68h-2c0-.5.1-.84.29-1.08c.21-.24.55-.52 1.07-.84c.26-.14.47-.32.64-.54c.14-.21.22-.46.22-.74c0-.3-.09-.52-.27-.69c-.18-.18-.45-.26-.76-.26c-.27 0-.49.07-.69.21c-.16.14-.26.35-.26.63H9.27c-.05-.69.23-1.29.78-1.65c.54-.36 1.25-.54 2.14-.54M11 17h2v2h-2z"/></svg>
                                            <Link
                                                to="/user"
                                            >
                                                Change Password
                                            </Link>
                                        </button>
                                    </MenuItem>
                                    )}
                                    <div className="my-1 h-px bg-white/5" />
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-white/30"   width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v1"/></svg>
                                            <Link
                                                to="/signin"
                                            >
                                                Login
                                            </Link>

                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-white/30"  width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 1 1-8 0a4 4 0 0 1 8 0M3 20a6 6 0 0 1 12 0v1H3z"/></svg>
                                            <Link
                                                to="/signup"
                                            >
                                                Signup
                                            </Link>
                                        </button>
                                    </MenuItem>
                                    {ifLog && (
                                    <MenuItem>
                                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-white/30" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/></svg>
                                            <Link
                                                to="/logout"
                                            >
                                                Logout
                                            </Link>
                                        </button>
                                    </MenuItem>
                                    )}
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>

            {isPreferencesList && <PreferencesPanel />}
        </nav>
    );
};

export default Navbar;







