"use client";

import Input from "./Input"; // Import reusable Input component
import Button from "./Button"; // Import reusable Button component

// TaskItem component to render individual task items
export default function TaskItem({
  task, // Task object containing task details
  editingTaskId, // ID of the task being edited
  editingTaskTitle, // Title of the task being edited
  setEditingTaskTitle, // Function to set the title of the task being edited
  handleKeyDown, // Function to handle key down events
  toggleTask, // Function to toggle task completion status
  startEditing, // Function to start editing a task
  cancelEditing, // Function to cancel editing a task
  updateTask, // Function to update a task
  deleteTask, // Function to delete a task
  formatDate, // Function to format date
  timeZone // Time zone string
}) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  return (
    <div id="list" key={task._id} className="w-full flex">
      <li id="listItem" className="grid grid-cols-1 sm:grid-cols-3 justify-center text-left items-center">
        <div id="listCheck" className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed} // Checkbox to toggle task completion status
            onChange={() => toggleTask(task._id, !task.completed)}
          />
          {editingTaskId === task._id ? (
            <Input
              type="text"
              value={editingTaskTitle} // Input field to edit task title
              onChange={(e) => setEditingTaskTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => updateTask(task._id), cancelEditing)}
              onBlur={cancelEditing} // Handle blur event to cancel editing
              autoFocus
              className="ml-4" // Increase left margin
            />
          ) : (
            <span className={`text-lg ${task.completed ? "line-through" : ""} ml-4`}>
              {task.title} {/* Display task title */}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 flex flex-col items-start m-16">
          <div>Created: {formatDate(task.createdAt)} ({timeZone})</div> {/* Display task creation date */}
          <div>Updated: {formatDate(task.updatedAt)} ({timeZone})</div> {/* Display task update date */}
          {task.completedAt && <div>Completed: {formatDate(task.completedAt)} ({timeZone})</div>} {/* Display task completion date if available */}
        </div>
        <div className="flex justify-end items-center space-x-2">
          {editingTaskId === task._id ? (
            <div className="space-x-2 flex justify-end items-center">
              <Button
                onClick={() => updateTask(task._id)} // Button to save edited task
                className="bg-green-500 text-white" // Apply consistent styling, width, and color
              >
                Save
              </Button>
              <Button
                onClick={cancelEditing} // Button to cancel editing
                className="bg-red-500 text-white" // Apply consistent styling, width, and color
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-x-2 flex justify-end items-center mx-4">
              <Button
                onClick={() => startEditing(task)} // Button to start editing task
                className="bg-purple-500 text-white" // Apply consistent styling, width, and color
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(task._id)} // Button to delete task with confirmation
                className="bg-orange-500 text-white" // Apply consistent styling, width, and color
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </li>
    </div>
  );
}