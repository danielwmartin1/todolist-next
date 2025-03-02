"use client";

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
            <input
              type="text"
              value={editingTaskTitle} // Input field to edit task title
              onChange={(e) => setEditingTaskTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => updateTask(task._id), cancelEditing)}
              autoFocus
              className="w-full sm:w-1/2 px-4 py-2 m-2 ml-4 border rounded-md" // Increase size, apply consistent styling, and increase left margin
              style={{ borderRadius: "6px" }}
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
              <button
                onClick={() => updateTask(task._id)} // Button to save edited task
                className="w-24 px-4 py-2 m-2 border rounded-md bg-green-500 text-white" // Apply consistent styling, width, and color
                style={{ borderRadius: "6px" }}
              >
                Save
              </button>
              <button
                onClick={cancelEditing} // Button to cancel editing
                className="w-24 px-4 py-2 m-2 border rounded-md bg-red-500 text-white" // Apply consistent styling, width, and color
                style={{ borderRadius: "6px" }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="space-x-2 flex justify-end items-center mx-4">
              <button
                onClick={() => startEditing(task)} // Button to start editing task
                className="w-24 px-4 py-2 m-2 border rounded-md bg-purple-500 text-white" // Apply consistent styling, width, and color
                style={{ borderRadius: "6px" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)} // Button to delete task
                className="w-24 px-4 py-2 m-2 border rounded-md bg-yellow-500 text-white" // Apply consistent styling, width, and color
                style={{ borderRadius: "6px" }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </li>
    </div>
  );
}
