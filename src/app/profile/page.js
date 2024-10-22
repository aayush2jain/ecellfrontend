'use client'; // Client-side code

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://ecell-orcin.vercel.app/user/getuser', {
          method: 'GET',
          credentials: 'include', // Important to include cookies
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Set the user data
        } else {
          setError('Failed to fetch profile');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div id="profile" className='w-[100vw] h-[100vh] md:pt-[20vh]'>
   <div  className="container  bg-black/20 rounded-3xl text-white mx-auto p-6 md:w-[50vw]">
  <h1 className="text-3xl font-bold mb-6 pl-[14vw]">User Dashboard</h1>
  
  {/* Two-column layout on large screens, one-column on small screens */}
  <div className="grid grid-cols text-white -1 md:grid-cols-2 bg-black/20 rounded-lg shadow-md p-6">
    {/* User Info */}
    <div className="space-y-4 flex flex-col md:mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4">User Information</h2> */}
      {user ? (
        <>
          <div className='text-xl'>
          <h1 className='font-semibold text-gray-400'>Name:</h1>
          <h1 className='m-0 underline underline-offset-[1vh] w-full decoration-gray-500	'>{user.username || 'N/A'}</h1>
          </div>
          <div className='text-xl'>
          <h1 className='font-semibold text-gray-400'>Email:</h1>
          <h1 className='m-0 underline underline-offset-4 w-full decoration-gray-500	'>{user.email || 'N/A'}</h1>
          </div>
          
          <div className='text-xl'>
          <h1 className='font-semibold text-gray-400'>College-Year:</h1>
          <h1 className='m-0  w-full  decoration-gray-500		'>{user.year || 'N/A'}</h1>
          </div>
          {/* <p><strong className='text-xl' >Name:</strong> {user.username || 'N/A'}</p>
          <p><strong  className='text-xl' >Email:</strong> {user.email || 'N/A'}</p>
          <p><strong className='text-xl' >Phone:</strong> {user.number || 'N/A'}</p>
          <p><strong className='text-xl' >College Name:</strong> {user.college || 'N/A'}</p>
          <p><strong className='text-xl' >City:</strong> {user.collegeCity || 'N/A'}</p>
          <p><strong className='text-xl' >Year of Study:</strong> {user.year || 'N/A'}</p> */}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>

    {/* Task Info */}
    <div className="space-y-4 flex flex-col md:mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4">Task Summary</h2> */}
      {user ? (
        <>
        
          <div className='text-xl '>
          <h1 className='font-semibold text-gray-400'>Phone:</h1>
          <h1 className='m-0 underline underline-offset-4 w-full  decoration-gray-500	'>{user.number || 'N/A'}</h1>
          </div>
          <div className='text-xl'>
          <h1 className='font-semibold text-gray-400'>College:</h1>
          <h1 className='m-0 underline underline-offset-4 w-full decoration-gray-500	'>{user.college || 'N/A'}</h1>
          </div>
           <div className='text-xl'>
          <h1 className='font-semibold text-gray-400'>TaskCompleted:</h1>
          <h1 className='m-0  w-full decoration-gray-500		'>{user.tasksCompleted.length || 'N/A'}</h1>
          </div>
         
        </>
      ) : (
        <p>No task data available</p>
      )}
    </div>
     
  </div>
  <a href="/task" className="text-blue-600 pl-[17vw] text-xl hover:underline font-medium">
            Go to Task Page
          </a>
</div>
</div>
  );
};

export default Profile;
