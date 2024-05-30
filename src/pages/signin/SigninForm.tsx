// import React, { useState } from 'react';
// import { API_ENDPOINT } from '../../config/constants';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthorizeCxt';


// const SigninForm: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         try {
//             const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (!response.ok) {
//                 throw new Error('Sign-in failed');
//             }

//             const data = await response.json();
//             localStorage.setItem('authToken', data.auth_token);
//             localStorage.setItem('userData', JSON.stringify(data.user));
//             login();
//             navigate("/landingpage");

//         } catch (error) {
//             console.error('Sign-in failed:', error);
//         }
//     };

//     return (
//         <>
//         <div className="relative min-h-screen flex gap-7 items-center bg-gray-900 lg:justify-end md:justify-center w-full h-full overflow-hidden">
            
//             <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="object-cover w-full h-full absolute top-0 left-0"
//             >
//                 <source src="./SPORT(3).mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//             <div className='fixed top-0 z-40 w-full h-[100px] bg-transparent flex justify-between items-center px-5 md:px-10'>
//                 <div className='flex flex-row gap-3 items-center'>
//                     <h2 className='hidden sm:block text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 mt-5'>
//                         SportHive
//                     </h2>
//                 </div>

//                 <div className='flex relative pt-10 lg:mr-20 sm:mr-1'>
        
          
//                     <Link className=" bg-transparent   hover:border-transparent  text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/landingpage'}>HOME</Link>
//                     <Link className=" bg-transparent   hover:border-transparent  text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg  px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/signup'}>REGISTER</Link>
//             </div>
          
//             </div>
//             <div className='flex w-3/4 p-10'>
//                 <div className="items-center justify-center ">
//                     <div className="relative z-10 max-w-md w-full px-6 py-8 bg-gradient-to-r from-orange-800 to-gray-800 rounded-lg shadow-md">
//                         <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">Sign in</h1>
//                         <form onSubmit={handleSubmit}>
//                             <div>
//                                 <label className="block text-orange-400 font-semibold mb-2">Email:</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="w-full border font-semibold border-orange-900 bg-orange-800 rounded-md py-2 px-3  leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-orange-400 font-semibold mb-2">Password:</label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="w-full border font-semibold border-orange-900 bg-orange-800 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full border border-gray-800 text-orange-400 hover:bg-gray-800 bg-gradient-to-r from-gray-800 to-orange-800  font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//                             >
//                                 Sign In
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default SigninForm;



import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthorizeCxt';

const SigninForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign-in failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.auth_token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            login();
            navigate("/landingpage");

        } catch (error) {
            setError('Wrong credentials. Please try again.'); // Set error message
            console.error('Sign-in failed:', error);
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
                    <Link className=" bg-transparent hover:border-transparent text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/landingpage'}>HOME</Link>
                    <Link className=" bg-transparent hover:border-transparent text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-gray-500 font-semibold rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-xl" to={'/signup'}>REGISTER</Link>
                </div>
            </div>
            <div className='flex w-3/4 p-10'>
                <div className="items-center justify-center ">
                    <div className="relative z-10 max-w-md w-full px-6 py-8 bg-gradient-to-r from-orange-800 to-gray-800 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-center text-orange-400 mb-8">Sign in</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-orange-400 font-semibold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border font-semibold border-orange-900 bg-orange-800 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-orange-400 font-semibold mb-2">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border font-semibold border-orange-900 bg-orange-800 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full border border-gray-800 text-orange-400 hover:bg-gray-800 bg-gradient-to-r from-gray-800 to-orange-800 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default SigninForm;
