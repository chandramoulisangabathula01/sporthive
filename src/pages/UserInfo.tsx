import React from 'react';
import Navbar from './Navbar';

const UserInfo: React.FC = () => {
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <>
      <Navbar />
      <div className='w-screen h-screen bg-gray-900 flex items-start justify-center'>
        <div className="max-w-md mt-16 p-6 bg-gray-500 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            User Details
            <hr className='my-2' />
          </h2>
          <p className="mb-2"><strong>Name:</strong> {userData.name}</p>
          <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
