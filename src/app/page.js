"use client"; // Indicates that this component uses client-side rendering

import { useReducer } from "react"; // Import React hooks
import axios from "axios"; // Import axios for making HTTP requests
import Header from "./Header"; // Import Header component
import Footer from "./Footer"; // Import Footer component
import TaskForm from "./components/TaskForm"; // Import TaskForm component
import TaskList from "./components/TaskList"; // Import TaskList component
import useFetchTasks from "./hooks/useFetchTasks"; // Import custom hook
import { addTask, toggleTask, deleteTask, startEditing, cancelEditing, updateTask, formatDate, handleKeyDown } from "./utils/taskFunctions"; // Import task functions

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

  // Render the main page with header, task form, task list, and footer
  return (
    <div className="flex flex-col min-h-screen bg-gray-800"> {/* Set background color to grey */}
      <Header /> {/* Render Header component */}
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <TaskForm
          newTask={state.newTask} // Pass newTask state to TaskForm
          setNewTask={(value) => dispatch({ type: 'SET_NEW_TASK', payload: value })} // Pass setNewTask function to TaskForm
          addTask={() => addTask(state, dispatch, fetchTasks)} // Pass addTask function to TaskForm
          handleKeyDown={(e) => handleKeyDown(e, () => addTask(state, dispatch, fetchTasks))} // Pass handleKeyDown function to TaskForm
        />
        <hr id="hr" className="my-4" /> {/* Horizontal rule */}
        <TaskList
          tasks={state.tasks} // Pass tasks state to TaskList
          editingTaskId={state.editingTaskId} // Pass editingTaskId state to TaskList
          editingTaskTitle={state.editingTaskTitle} // Pass editingTaskTitle state to TaskList
          setEditingTaskTitle={(value) => dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: value })} // Pass setEditingTaskTitle function to TaskList
          handleKeyDown={(e) => handleKeyDown(e, () => updateTask(state.editingTaskId, state, dispatch, fetchTasks), cancelEditing)} // Pass handleKeyDown function to TaskList
          toggleTask={(id, completed) => toggleTask(id, completed, state, dispatch, fetchTasks)} // Pass toggleTask function to TaskList
          startEditing={(task) => startEditing(task, dispatch)} // Pass startEditing function to TaskList
          cancelEditing={() => cancelEditing(dispatch)} // Pass cancelEditing function to TaskList
          updateTask={(id) => updateTask(id, state, dispatch, fetchTasks)} // Pass updateTask function to TaskList
          deleteTask={(id) => deleteTask(id, state, dispatch, fetchTasks)} // Pass deleteTask function to TaskList
          formatDate={(date) => formatDate(date, state.timeZone)} // Pass formatDate function to TaskList
          timeZone={state.timeZone} // Pass timeZone state to TaskList
        />
      </main>
      <Footer /> {/* Render Footer component */}
    </div>
  );
}