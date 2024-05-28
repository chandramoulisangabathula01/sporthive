import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ChangePassword from './password/PasswordChange';
import useUserPreferences from './preferences/SpecificUserPreferences';


const UserInfo: React.FC = () => {
    const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
    const authToken = localStorage.getItem("authToken");
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [loadingPreferences, setLoadingPreferences] = useState<boolean>(true); // State for loading preferences
    const userPreferences = useUserPreferences(authToken);

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    useEffect(() => {
        if (userPreferences !== null) {
            setLoadingPreferences(false);
        }
    }, [userPreferences]);

    return (
        <>
            <Navbar />
            <div className="py-16 bg-gray-800 h-screen">
                <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl border border-gray-700 shadow-lg ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover">
                        <img src="./public/3dmodel1.png" alt="user details" />
                    </div>
                    <div className="w-full p-8 lg:w-1/2 bg-gray-700">
                        <div className="items-center justify-center ">
                            <div className="relative  max-w-md w-full px-6 py-8 bg-gray-700 rounded-lg shadow-md">

                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    User Details
                                    <hr className='my-2' />
                                </h2>
                                <p className="mb-2 text-white"><strong>Name :</strong> {userData.name}</p>
                                <p className="mb-2 text-white"><strong>Email :</strong> {userData.email}</p>
                                <h3 className="text-lg font-bold mb-2 text-white underline">Your Preferences:</h3>
                                <div className="mb-4 ">
                                    {loadingPreferences ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            {userPreferences && userPreferences.selectedTeams && userPreferences.selectedSports ? (
                                                <>
                                                    {userPreferences.selectedTeams.length > 0 || userPreferences.selectedSports.length > 0 ? (
                                                        <>
                                                            <p className="mb-2 text-white"><strong>Selected Sports :</strong> {userPreferences.selectedSports.join(', ')}</p>
                                                            <p className="mb-2 text-white"><strong>Selected Teams :</strong> {userPreferences.selectedTeams.join(', ')}</p>
                                                        </>
                                                    ) : (
                                                        <p className="mb-2 text-white">No Preferences selected</p>
                                                    )}
                                                </>
                                            ) : (
                                                <p className="mb-2 text-white">No Preferences selected</p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <button onClick={() => setShowChangePasswordModal(true)}
                                    className="bg-gray-900 hover:bg-gray-500 mt-2 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >Change Password</button>
                            </div>
                            </div>
                            </div>

                        </div>

                        {showChangePasswordModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
                                <ChangePassword closeModal={handleCloseChangePasswordModal} />
                            </div>
                        )}

                    </div>


                </>

                );
};

                export default UserInfo;
