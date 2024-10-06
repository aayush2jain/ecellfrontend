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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-blue-500 font-bold">Points: {task.points}</p>
            </div>
            
            {/* Input field for Google Drive submission link */}
            {!submittedTasks.includes(task._id) && (
              <input
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Enter Google Drive link"
                value={submissionLinks[task._id] || ''} // Set the value from the state
                onChange={(e) => handleInputChange(task._id, e.target.value)} // Handle input change
              />
            )}

            <button
              onClick={() => handleSubmitTask(task._id)}
              className={`px-4 py-2 font-semibold rounded-md ${
                submittedTasks.includes(task._id) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={submittedTasks.includes(task._id) || !submissionLinks[task._id]} // Disable if already submitted or no link provided
            >
              {submittedTasks.includes(task._id) ? 'Submitted' : 'Submit Task'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
