
// import React, { useState } from 'react';
// import { API_ENDPOINT } from '../../config/constants';
// import { useNavigate } from 'react-router-dom';


// const SignupForm: React.FC = () => {
//   const [organisationName, setOrganisationName] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_ENDPOINT}/organisations`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: organisationName, user_name: userName, email: userEmail, password: userPassword}),
//       });

//       if (!response.ok) {
//         throw new Error('Sign-up failed');
//       }
//       console.log('Sign-up successful');

//       // extract the response body as JSON data
//     const data = await response.json();

//     // if successful, save the token in localStorage
//     localStorage.setItem('authToken', data.token);
//     localStorage.setItem('userData', JSON.stringify(data.user))
    
//     navigate("/landingpage")

//       // Dialogue: After successful signup we have to redirect the user to the secured page. We will do that later.
//     } catch (error) {
//       console.error('Sign-up failed:', error);
//     }

    
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Organisation Name:</label>
//         <input type="text" name="organisationName" id="organisationName" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
//         <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Password:</label>
//         <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign up</button>
//     </form>
//   );
// };



// export default SignupForm;



// import React, { useState } from 'react';
// import { API_ENDPOINT } from '../../config/constants';
// import { Link, useNavigate } from 'react-router-dom';

// const SignupForm: React.FC = () => {
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_ENDPOINT}/users`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Sign-up failed. Enter proper credentials.');
//       }

//       const data = await response.json();
//       localStorage.setItem('authToken', data.auth_token);
//       localStorage.setItem('userData', JSON.stringify(data.user));

//       navigate('/landingpage');

//     } catch (error) {
//       //@ts-ignore
//       setError(error.message);
//       console.error('Sign-up failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
//         <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Password:</label>
//         <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
//       </div>
//       <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign up</button>
//       <p className="mt-2 text-center">
//         Already have an account? <Link to="/signin" className="text-blue-500">Sign in here</Link>
//       </p>
//       <p className="mt-2 text-center">
//         Stay Signed out <Link to="/landingpage" className="text-blue-500">Home</Link>
//       </p>
//     </form>
//   );
// };

// export default SignupForm;


import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign-up failed. Enter proper credentials.');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.auth_token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      navigate('/landingpage');

    } catch (error) {
        //@ts-ignore
      setError(error.message);
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">Your Name:</label>
        <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userEmail">Email:</label>
        <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userPassword">Password:</label>
        <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign up</button>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/signin" className="text-blue-500">Sign in here</Link>
      </p>
      <p className="mt-2 text-center">
        Stay Signed out <Link to="/landingpage" className="text-blue-500">Home</Link>
      </p>
    </form>
  );
};

export default SignupForm;
