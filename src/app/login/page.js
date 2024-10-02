'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecell-orcin.vercel.app/user/', formData,
         {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include cookies
            }
      );
      if (response.status === 200) {
        alert('Login successful!');
        router.push('/profile'); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('Login failed, please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'; // Redirect to Google OAuth route
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <span className="border-b border-gray-300 w-full"></span>
          <span className="px-4 text-gray-500">or</span>
          <span className="border-b border-gray-300 w-full"></span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
        >
          Login with Google
        </button>
      </div>
    </div>
   
  );
};

export default Login;
