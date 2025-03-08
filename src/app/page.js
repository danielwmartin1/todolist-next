"use client"; // Indicates that this component uses client-side rendering

import { useReducer } from "react"; // Import React hooks
import axios from "axios"; // Import axios for making HTTP requests
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import TaskForm from "./components/TaskForm"; // Import TaskForm component
import TaskList from "./components/TaskList"; // Import TaskList component
import useFetchTasks from "./hooks/useFetchTasks"; // Import custom hook

import './styles.css'; // Import styles

// Define initial state for the reducer
const initialState = {
  tasks: [],
  newTask: "",
  editingTaskId: null,
  editingTaskTitle: "",
  timeZone: ""
};

// Define reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'SET_NEW_TASK':
      return { ...state, newTask: action.payload };
    case 'SET_EDITING_TASK_ID':
      return { ...state, editingTaskId: action.payload };
    case 'SET_EDITING_TASK_TITLE':
      return { ...state, editingTaskTitle: action.payload };
    case 'SET_TIME_ZONE':
      return { ...state, timeZone: action.payload };
    default:
      return state;
  }
}

export default function Home() {
  // Use useReducer hook to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Use custom hook to fetch tasks
  const fetchTasks = useFetchTasks(dispatch);

  // Add a new task
  const addTask = async () => {
    if (!state.newTask) return; // Return if newTask is empty
    try {
      await axios.post("/api/tasks", { title: state.newTask }); // Make a POST request to add a new task
      fetchTasks(); // Fetch tasks after adding a new task
      dispatch({ type: 'SET_NEW_TASK', payload: "" }); // Clear new task input
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
        dispatch({ type: 'SET_TASKS', payload: state.tasks.map(task => task._id === id ? response.data.task : task) }); // Update tasks state
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
      dispatch({ type: 'SET_TASKS', payload: state.tasks.filter(task => task._id !== id) }); // Update tasks state
    } catch (error) {
      console.error("Failed to delete task:", error); // Log error if deleting task fails
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    dispatch({ type: 'SET_EDITING_TASK_ID', payload: task._id }); // Set the ID of the task being edited
    dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: task.title }); // Set the title of the task being edited
  };

  // Cancel editing a task
  const cancelEditing = () => {
    dispatch({ type: 'SET_EDITING_TASK_ID', payload: null }); // Clear the ID of the task being edited
    dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: "" }); // Clear the title of the task being edited
  };

  // Update a task
  const updateTask = async (id) => {
    if (state.editingTaskTitle === state.tasks.find(task => task._id === id).title) {
      cancelEditing(); // Cancel editing if the title hasn't changed
      return;
    }
    try {
      await axios.put(`/api/tasks/${id}`, { title: state.editingTaskTitle }); // Make a PUT request to update the task
      fetchTasks(); // Fetch tasks after updating the task
      cancelEditing(); // Cancel editing
    } catch (error) {
      console.error("Failed to update task:", error); // Log error if updating task fails
    }
  };

  // Format date according to the time zone
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: state.timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short' // Include timezone
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
          newTask={state.newTask} // Pass newTask state to TaskForm
          setNewTask={(value) => dispatch({ type: 'SET_NEW_TASK', payload: value })} // Pass setNewTask function to TaskForm
          addTask={addTask} // Pass addTask function to TaskForm
          handleKeyDown={handleKeyDown} // Pass handleKeyDown function to TaskForm
        />
        <hr id="hr" className="my-4" /> {/* Horizontal rule */}
        <TaskList
          tasks={state.tasks} // Pass tasks state to TaskList
          editingTaskId={state.editingTaskId} // Pass editingTaskId state to TaskList
          editingTaskTitle={state.editingTaskTitle} // Pass editingTaskTitle state to TaskList
          setEditingTaskTitle={(value) => dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: value })} // Pass setEditingTaskTitle function to TaskList
          handleKeyDown={handleKeyDown} // Pass handleKeyDown function to TaskList
          toggleTask={toggleTask} // Pass toggleTask function to TaskList
          startEditing={startEditing} // Pass startEditing function to TaskList
          cancelEditing={cancelEditing} // Pass cancelEditing function to TaskList
          updateTask={updateTask} // Pass updateTask function to TaskList
          deleteTask={deleteTask} // Pass deleteTask function to TaskList
          formatDate={formatDate} // Pass formatDate function to TaskList
          timeZone={state.timeZone} // Pass timeZone state to TaskList
        />
      </main>
      <Footer /> {/* Render Footer component */}
    </div>
  );
}