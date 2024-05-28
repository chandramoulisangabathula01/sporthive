import React, { useState } from 'react';
import Navbar from './Navbar';
import ChangePassword from './password/PasswordChange';


const UserInfo: React.FC = () => {
    const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);

    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const handleCloseChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    return (
        <>
            <Navbar />
            <div className='w-screen h-screen bg-gray-900 flex items-start justify-center'>
                <div className="max-w-md mt-16 p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        User Details
                        <hr className='my-2' />
                    </h2>
                    <p className="mb-2 text-white"><strong>Name:</strong> {userData.name}</p>
                    <p className="mb-2 text-white"><strong>Email:</strong> {userData.email}</p>
                    <button onClick={() => setShowChangePasswordModal(true)}
                        className="bg-gray-700 hover:bg-gray-500 mt-2 text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >Change Password</button>
                </div>

            </div>

            {showChangePasswordModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
                    <ChangePassword closeModal={handleCloseChangePasswordModal} />
                </div>
            )}
        </>
    );
};

export default UserInfo;
