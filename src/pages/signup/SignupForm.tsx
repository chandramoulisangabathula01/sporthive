import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import process from 'process';

const SignupForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch(`${API_ENDPOINT}/users`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Sign-up failed. Enter proper credentials.');
  //     }

  //     const data = await response.json();
  //     localStorage.setItem('authToken', data.auth_token);
  //     localStorage.setItem('userData', JSON.stringify(data.user));

  //     navigate('/landingpage');

  //   } catch (error) {
  //     //@ts-ignore
  //     setError(error.message);
  //     console.error('Sign-up failed:', error);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Sign-up failed. Please enter valid credentials.');
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
    <>
      <div className="relative min-h-screen flex gap-7 items-center bg-gray-900 lg:justify-end md:justify-center w-full h-full overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full absolute top-0 left-0"
        >
          <source src="./SPORT(3).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='fixed top-0 z-40 w-full h-[100px] bg-transparent flex justify-between items-center px-5 md:px-10'>
          <div className='flex flex-row gap-3 items-center'>
            <h2 className='hidden sm:block text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 mt-5'>
              SportHive
            </h2>
          </div>

          <div className='flex relative pt-10 lg:mr-20 sm:mr-1'>


            <Link className=" bg-transparent   hover:border-transparent  text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/landingpage'}>HOME</Link>
            <Link className=" bg-transparent   hover:border-transparent  text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/signin'}>LOGIN</Link>
          </div>

        </div>
        <div className='flex w-3/4 p-10'>
          <div className="items-center justify-center ">
            <div className="relative z-10 max-w-md w-full px-6 py-8 bg-gradient-to-r from-orange-800 to-gray-800 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">Sign up</h1>
              
              <form  onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div>
                  <label className="block text-orange-400 font-semibold mb-2" htmlFor="userName">Your Name:</label>
                  <input type="text" name="userName" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full border font-semibold border-red-900 bg-orange-800 rounded-md py-2 px-3  leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                </div>
                <div className="mb-4">
                  <label className="block text-orange-400 font-semibold mb-2" htmlFor="userEmail">Email:</label>
                  <input type="email" name="userEmail" id="userEmail" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full border font-semibold border-red-900 bg-orange-800 rounded-md py-2 px-3  leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                </div>
                <div className="mb-6">
                  <label className="block text-orange-400 font-semibold mb-2" htmlFor="userPassword">Password:</label>
                  <input type="password" name="userPassword" id="userPassword" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="w-full border font-semibold border-red-900 bg-orange-800 rounded-md py-2 px-3  leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                </div>
                <button type="submit" className="w-full border border-gray-800 text-orange-400 hover:bg-gray-800 bg-gradient-to-r from-gray-800 to-orange-800  font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign up</button>
                <p className="mt-4 text-center">
                  Already have an account? <Link to="/signin" className="text-gray-500">Sign in here</Link>
                </p>
                <p className="mt-2 text-center">
                  Stay Signed out <Link to="/landingpage" className="text-gray-500">Home</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

