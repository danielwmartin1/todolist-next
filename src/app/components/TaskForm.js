"use client";

import Input from "./Input"; // Import reusable Input component
import Button from "./Button"; // Import reusable Button component

// TaskForm component definition
export default function TaskForm({ newTask, setNewTask, addTask, handleKeyDown, children }) {
  return (
    // Container div with flexbox styling for layout
    <div className="p-4 flex flex-col sm:flex-row items-center justify-center">
      <Input
        type="text" // Input field for new task
        placeholder="New Task" // Placeholder text
        value={newTask} // Controlled input value
        onChange={(e) => setNewTask(e.target.value)} // Update newTask state on change
        onKeyDown={(e) => handleKeyDown(e, addTask, () => setNewTask(""))} // Handle key down event
        autoFocus // Autofocus on input field
      />
      <Button
        onClick={addTask} // Add task on button click
        className="bg-blue-500 text-white" // Apply consistent styling, width, and color
      >
        Add Task
      </Button>
      {children}
    </div>
  );
}
