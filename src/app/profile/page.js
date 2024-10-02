'use client'; // Client-side code

import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://ecell-orcin.vercel.app/user/getuser',{
           method: 'GET',
          credentials: 'include', // Important to include cookies
           headers: {
           'Content-Type': 'application/json',
           }}
        );

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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.number}</p>
        <p><strong>College Name:</strong> {user.collegeCity}</p>
        <p><strong>Year of Study:</strong> {user.year}</p>
      </div>
    </div>
  );
};

export default Profile;
