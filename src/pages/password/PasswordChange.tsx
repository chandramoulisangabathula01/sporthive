import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';

interface PasswordChangeProps {
    closeDialog: () => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ closeDialog }) => {
    const [currentPass, setCurrentPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const authtoken = localStorage.getItem('authToken');

    const updatePassword = async () => {
        try {
            const result = await fetch(`${API_ENDPOINT}/user/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authtoken}`,
                },
                body: JSON.stringify({
                    current_password: currentPass,
                    new_password: newPass,
                }),
            });

            if (result.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    closeDialog();
                }, 3000);
            } else {
                console.error('Failed to update password');
            }
        } catch (error) {
            console.error('Password update error:', error);
        }
    };

    return (
        <div className="bg-gray-700 p-6 w-1/3 rounded-lg relative">
            {isSuccess && (
                <div className="bg-green-200 text-green-800 px-4 py-2 rounded-lg">
                    Password Updated Successfully
                </div>
            )}
            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
            <div className="mb-4">
                <label htmlFor="currentPass" className="block mb-2 text-sm font-medium">Current Password</label>
                <input 
                    type="password" 
                    id="currentPass" 
                    value={currentPass} 
                    onChange={(e) => setCurrentPass(e.target.value)} 
                    className="border border-gray-600 px-3 py-2 bg-gray-300 rounded w-full" 
                />
            </div>
            <div className="mb-4">
                <label htmlFor="newPass" className="block mb-2 text-sm font-medium">New Password</label>
                <input 
                    type="password" 
                    id="newPass" 
                    value={newPass} 
                    onChange={(e) => setNewPass(e.target.value)} 
                    className="border border-gray-600 px-3 py-2 bg-gray-300 rounded w-full" 
                />
            </div>
            <div className="flex justify-end gap-2">
                <button 
                    onClick={closeDialog} 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Cancel
                </button>
                <button 
                    onClick={updatePassword} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default PasswordChange;
