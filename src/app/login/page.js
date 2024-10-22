'use client';
import bg1 from '../../../public/bg1.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // New loading state

  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://ecell-orcin.vercel.app/user/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies
      });
      if (response.status === 200) {
        router.push('/profile'); // Redirect to profile after login
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Login failed, please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'; // Redirect to Google OAuth route
  };

  return (
    <div id="loginpage" className="min-h-screen flex items-center  justify-center">
      <div className=" bg-black/40  ring-yellow-600/40 ring-4  border-1 border-solid border-yellow-700 shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-400 text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block text-xl text-white w-full p-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-700"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xl font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block text-xl text-white w-full p-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-700"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-yellow-600 text-gray-700 font-medium py-2 rounded-lg shadow-lg transition duration-200 ${loading ? 'bg-yellow-600 cursor-not-allowed' : 'hover:bg-yellow-800'}`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

