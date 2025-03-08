"use client";

import TaskItem from "./TaskItem"; // Import TaskItem component

export default function TaskList({
  tasks, // Array of task objects
  editingTaskId, // ID of the task currently being edited
  editingTaskTitle, // Title of the task currently being edited
  setEditingTaskTitle, // Function to set the title of the task being edited
  handleKeyDown, // Function to handle key down events
  toggleTask, // Function to toggle the completion status of a task
  startEditing, // Function to start editing a task
  cancelEditing, // Function to cancel editing a task
  updateTask, // Function to update a task
  deleteTask, // Function to delete a task
  formatDate, // Function to format the date
  timeZone // Time zone for date formatting
}) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id} // Unique key for each task item
          task={task} // Task object
          editingTaskId={editingTaskId} // ID of the task currently being edited
          editingTaskTitle={editingTaskTitle} // Title of the task currently being edited
          setEditingTaskTitle={setEditingTaskTitle} // Function to set the title of the task being edited
          handleKeyDown={handleKeyDown} // Function to handle key down events
          toggleTask={toggleTask} // Function to toggle the completion status of a task
          startEditing={startEditing} // Function to start editing a task
          cancelEditing={cancelEditing} // Function to cancel editing a task
          updateTask={updateTask} // Function to update a task
          deleteTask={deleteTask} // Function to delete a task
          formatDate={formatDate} // Function to format the date
          timeZone={timeZone} // Time zone for date formatting
        />
      ))}
    </ul>
  );
}