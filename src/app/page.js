"use client"; // Indicates that this component uses client-side rendering

import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import axios for making HTTP requests
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import TaskForm from "./components/TaskForm"; // Import TaskForm component
import TaskList from "./components/TaskList"; // Import TaskList component

import './styles.css'; // Import styles

export default function Home() {
  // State variables to manage tasks, new task input, editing state, and time zone
  const [tasks, setTasks] = useState([]); // Array of tasks
  const [newTask, setNewTask] = useState(""); // New task input
  const [editingTaskId, setEditingTaskId] = useState(null); // ID of the task being edited
  const [editingTaskTitle, setEditingTaskTitle] = useState(""); // Title of the task being edited
  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); // User's time zone

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks"); // Make a GET request to fetch tasks
      const fetchedTasks = response.data.tasks || []; // Get tasks from response
      if (!Array.isArray(fetchedTasks)) {
        throw new Error("Fetched tasks is not an array"); // Throw error if tasks is not an array
      }
      const validTasks = fetchedTasks.filter(task => !isNaN(new Date(task.createdAt).getTime())); // Filter valid tasks
      setTasks(validTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort tasks by creation date
    } catch (error) {
      console.error("Failed to fetch tasks:", error); // Log error if fetching tasks fails
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks(); // Call fetchTasks when component mounts
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTask) return; // Return if newTask is empty
    try {
      await axios.post("/api/tasks", { title: newTask }); // Make a POST request to add a new task
      fetchTasks(); // Fetch tasks after adding a new task
      setNewTask(""); // Clear new task input
    } catch (error) {
      console.error("Failed to add task:", error); // Log error if adding task fails
    }
  };

  // Toggle task completion status
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { completed }); // Make a PATCH request to toggle task completion status
      fetchTasks(); // Fetch tasks after toggling task completion status
      if (response.data.task) {
        setTasks(tasks.map(task => task._id === id ? response.data.task : task)); // Update tasks state
      }
    } catch (error) {
      console.error("Failed to toggle task:", error); // Log error if toggling task fails
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // Make a DELETE request to delete a task
      fetchTasks(); // Fetch tasks after deleting a task
      setTasks(tasks.filter(task => task._id !== id)); // Update tasks state
    } catch (error) {
      console.error("Failed to delete task:", error); // Log error if deleting task fails
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task._id); // Set the ID of the task being edited
    setEditingTaskTitle(task.title); // Set the title of the task being edited
  };

  // Cancel editing a task
  const cancelEditing = () => {
    setEditingTaskId(null); // Clear the ID of the task being edited
    setEditingTaskTitle(""); // Clear the title of the task being edited
  };

  // Update a task
  const updateTask = async (id) => {
    if (editingTaskTitle === tasks.find(task => task._id === id).title) {
      cancelEditing(); // Cancel editing if the title hasn't changed
      return;
    }
    try {
      await axios.put(`/api/tasks/${id}`, { title: editingTaskTitle }); // Make a PUT request to update the task
      fetchTasks(); // Fetch tasks after updating the task
      cancelEditing(); // Cancel editing
    } catch (error) {
      console.error("Failed to update task:", error); // Log error if updating task fails
    }
  };

  // Format date according to the time zone
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date(date)); // Format date
  };

  // Handle key down events for adding or editing tasks
  const handleKeyDown = (e, action, cancelAction) => {
    if (e.key === "Enter") {
      action(); // Call action if Enter key is pressed
    } else if (e.key === "Escape" && cancelAction) {
      cancelAction(); // Call cancelAction if Escape key is pressed
    }
  };

  // Render the main page with header, task form, task list, and footer
  return (
    <div className="flex flex-col min-h-screen bg-gray-800"> {/* Set background color to grey */}
      <Header /> {/* Render Header component */}
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <TaskForm
          newTask={newTask} // Pass newTask state to TaskForm
          setNewTask={setNewTask} // Pass setNewTask function to TaskForm
          addTask={addTask} // Pass addTask function to TaskForm
          handleKeyDown={handleKeyDown} // Pass handleKeyDown function to TaskForm
        />
        <hr id="hr" className="my-4" /> {/* Horizontal rule */}
        <TaskList
          tasks={tasks} // Pass tasks state to TaskList
          editingTaskId={editingTaskId} // Pass editingTaskId state to TaskList
          editingTaskTitle={editingTaskTitle} // Pass editingTaskTitle state to TaskList
          setEditingTaskTitle={setEditingTaskTitle} // Pass setEditingTaskTitle function to TaskList
          handleKeyDown={handleKeyDown} // Pass handleKeyDown function to TaskList
          toggleTask={toggleTask} // Pass toggleTask function to TaskList
          startEditing={startEditing} // Pass startEditing function to TaskList
          cancelEditing={cancelEditing} // Pass cancelEditing function to TaskList
          updateTask={updateTask} // Pass updateTask function to TaskList
          deleteTask={deleteTask} // Pass deleteTask function to TaskList
          formatDate={formatDate} // Pass formatDate function to TaskList
          timeZone={timeZone} // Pass timeZone state to TaskList
        />
      </main>
      <Footer /> {/* Render Footer component */}
    </div>
  );
}