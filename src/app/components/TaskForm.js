"use client";

// TaskForm component definition
export default function TaskForm({ newTask, setNewTask, addTask, handleKeyDown }) {
  return (
    // Container div with flexbox styling for layout
    <div className="pt-0 flex flex-col sm:flex-row items-center justify-center">
      <input
        type="text" // Input field for new task
        placeholder="New Task" // Placeholder text
        value={newTask} // Controlled input value
        onChange={(e) => setNewTask(e.target.value)} // Update newTask state on change
        onKeyDown={(e) => handleKeyDown(e, addTask, () => setNewTask(""))} // Handle key down event
        autoFocus // Autofocus on input field
        className="w-full sm:w-1/2 px-4 py-2 m-2 border rounded-md" // Increase size and apply consistent styling
        style={{ borderRadius: "6px" }}
      />
      <button
        style={{ minWidth: "50%", borderRadius: "6px" }} // Button with minimum width and border-radius styling
        className="w-24 px-4 py-2 m-2 border rounded-md bg-blue-500 text-white" // Apply consistent styling, width, and color
        onClick={addTask} // Add task on button click
      >
        Add Task
      </button>
    </div>
  );
}
