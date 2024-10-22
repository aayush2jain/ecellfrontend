'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [submissionLinks, setSubmissionLinks] = useState({}); // To store Google Drive links for each task

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://ecell-orcin.vercel.app/user/get-task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Fetch submitted tasks from the backend
  useEffect(() => {
    const fetchSubmittedTasks = async () => {
      try {
        const response = await axios.get('https://ecell-orcin.vercel.app/user/usertask', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies for auth
        });
        // Assuming the response contains an array of submitted task IDs
        setSubmittedTasks(response.data.submittedTasks.map((task) => task.taskId._id)); // Extracting task IDs
      } catch (error) {
        console.error('Error fetching submitted tasks:', error);
      }
    };

    fetchSubmittedTasks();
  }, []);

  // Handle input change for Google Drive link
  const handleInputChange = (taskId, value) => {
    setSubmissionLinks((prevLinks) => ({
      ...prevLinks,
      [taskId]: value, // Store the link for each task
    }));
  };

  // Handle task submission
  const handleSubmitTask = async (taskId) => {
    try {
      const response = await axios.post(
        `https://ecell-orcin.vercel.app/user/submit-task/${taskId}`,
        { submission: submissionLinks[taskId] }, // Send the Google Drive link as submission
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include cookies for auth
        }
      );

      // Check if the submission was successful
      if (response.status === 200) {
        console.log('Task submitted successfully:', response.data);
        // Add the taskId to the submitted tasks state
        setSubmittedTasks((prevSubmittedTasks) => [...prevSubmittedTasks, taskId]);
      } else {
        console.error('Failed to submit task:', response.data);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  console.log("googlesyb",submissionLinks);
  return (
    <div id="profile" className='w-[100vw] h-[100vh]'>
    <div  className="container mx-auto p-4">
  <h1 className="text-5xl font-bold my-[5vh] text-white text-center">All Tasks</h1>

  {/* Responsive table */}
  <div className=" rounded-xl overflow-x-auto h-[70vh]">
    <table className="min-w-full bg-black/40 shadow-md rounded-lg ">
      <thead>
        <tr className='text-xl'>
          <th className="py-2 px-4 border-b font-semibold text-gray-300 text-left">Title</th>
          <th className="py-2 px-4 border-b  font-semibold  text-gray-300 text-left">Description</th>
          <th className="py-2 px-4 border-b font-semibold  text-gray-300 text-left">Points</th>
          <th className="py-2 px-4 border-b  font-semibold  text-gray-300 text-left">Submit</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id} className="hover:bg-gray-700/60">
            <td className="py-2 px-4 border-b text-gray-100 text-lg font-medium">{task.title}</td>
            <td className="p-2 border-b w-full sm:w-[50vw] overflow-y-scroll text-gray-100 text-lg font-medium">
  <p className="whitespace-pre-line">
    
    {task.description}
  </p>
</td>

            <td className="py-2 px-4 border-b text-blue-500 font-bold">{task.points}</td>
            <td className="py-2 px-4 border-b">
              {!submittedTasks.includes(task._id) && (
                <input
                  type="text"
                  className="border bg-transparent text-gray-200 border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  placeholder="Google Drive link"
                  value={submissionLinks[task._id] || ''} // Value from state
                  onChange={(e) => handleInputChange(task._id, e.target.value)} // Input change handler
                />
              )}
              <button
                onClick={() => handleSubmitTask(task._id)}
                className={`w-full px-4 py-2 font-semibold rounded-md transition duration-200 ${
                  submittedTasks.includes(task._id)
                    ? 'bg-gray-600/90 text-gray-100'
                    : 'bg-blue-600/90 text-white hover:bg-blue-700'
                }`}
                disabled={submittedTasks.includes(task._id) || !submissionLinks[task._id]} // Disable when submitted or no link
              >
                {submittedTasks.includes(task._id) ? 'Submitted' : 'Submit Task'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
  );
};

export default TasksList;
