'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    number: '',
    collegeCity: '',
    college: '',
    year: '',
    resume: '', // Added resume field
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("check1");
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://ecell-orcin.vercel.app/user/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        alert('Registration successful!');
        router.push('/login'); // Redirect to login after registration
      }
    } catch (error) {
      console.error('Error during registration', error);
      alert('Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="loginpage"
      className="md:min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div className="bg-black/20 shadow-2xl rounded-lg p-8 w-full h-full md:h-auto md:max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-300 mb-6"> Register</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="username" className="block text-xl font-semibold text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xl font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xl font-semibold text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-xl font-semibold text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="number"
              id="number"
              placeholder="Enter your phone number"
              value={formData.number}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="collegeCity" className="block text-xl font-semibold text-gray-300">
              College City
            </label>
            <input
              type="text"
              name="collegeCity"
              id="collegeCity"
              placeholder="Enter your college city"
              value={formData.collegeCity}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="college" className="block text-xl font-semibold text-gray-300">
              College Name
            </label>
            <input
              type="text"
              name="college"
              id="college"
              placeholder="Enter your college name"
              value={formData.college}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-xl font-semibold text-gray-300">
              Year of Study
            </label>
            <input
              type="number"
              name="year"
              id="year"
              placeholder="Enter your year of study"
              value={formData.year}
              onChange={handleChange}
              className="w-full mt-2 p-2 text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-xl font-semibold text-gray-300">
              Resume (Google Drive Link)
            </label>
            <input
              type="url"
              name="resume"
              id="resume"
              placeholder="Enter the link to your resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full mt-2 p-2 border text-xl font-medium border-gray-600 bg-transparent rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-[20vw] md:mx-[20vw] mx-[25vw] mt-[5vh] py-2 rounded-lg text-lg font-bold text-gray-100 transition-all border border-yellow-900 duration-200 ${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
              disabled={loading}
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
                  Registering...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

