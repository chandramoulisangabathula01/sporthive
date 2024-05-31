import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import PasswordChange from './password/PasswordChange';
import useFetchPreferences from './preferences/SpecificUserPreferences';

const UserInformation: React.FC = () => {
    const [isPasswordModalVisible, setPasswordModalVisible] = useState<boolean>(false);
    const authToken = localStorage.getItem("authToken");
    const userString = localStorage.getItem('userData');
    const user = userString ? JSON.parse(userString) : null;
    const [isLoadingPreferences, setLoadingPreferences] = useState<boolean>(true);
    const userPreferences = useFetchPreferences(authToken);

    const closePasswordModal = () => {
        setPasswordModalVisible(false);
    };

    useEffect(() => {
        if (userPreferences !== null) {
            setLoadingPreferences(false);
        }
    }, [userPreferences]);

    return (
        <>
            <Navbar />
            <div className="pt-16 bg-gray-800 min-h-screen">
                <div className="flex bg-gray-600 rounded-lg shadow-lg overflow-hidden mx-auto max-w-md lg:max-w-3xl border border-dark shadow-lg ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover">
                        <img src="./3dmodel1.png" alt="User Details" />
                    </div>
                    <div className="w-full p-8 lg:w-1/2 bg-medium-gray">
                        <div className="items-center justify-center ">
                            <div className="relative max-w-md w-full px-6 py-8 bg-medium-gray rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold mb-4 text-light">
                                    User Information
                                    <hr className='my-2' />
                                </h2>
                                <p className="mb-2 text-light"><strong>Name:</strong> {user?.name}</p>
                                <p className="mb-2 text-light"><strong>Email:</strong> {user?.email}</p>
                                <h3 className="text-lg font-bold mb-2 text-light underline">Your Preferences:</h3>
                                <div className="mb-4">
                                    {isLoadingPreferences ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            {userPreferences && userPreferences.selectedTeams && userPreferences.selectedSports ? (
                                                <>
                                                    {userPreferences?.selectedTeams?.length > 0 || userPreferences?.selectedSports?.length > 0 ? (
                                                        <>
                                                            <p className="mb-2 text-light"><strong>Selected Sports:</strong> {userPreferences.selectedSports.join(', ')}</p>
                                                            <p className="mb-2 text-light"><strong>Selected Teams:</strong> {userPreferences.selectedTeams.join(', ')}</p>
                                                        </>
                                                    ) : (
                                                        <p className="mb-2 text-light">No Preferences selected</p>
                                                    )}
                                                </>
                                            ):(
                                                <p className="mb-2 text-white">No Preferences selected</p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <button onClick={() => setPasswordModalVisible(true)}
                                    className="bg-dark hover:bg-medium mt-2 text-light px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-medium"
                                >Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>

                {isPasswordModalVisible && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
                        <PasswordChange closeDialog={closePasswordModal} />
                    </div>
                )}
            </div>
        </>
    );
};

export default UserInformation;
