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
  console.log('TaskList component is rendering');

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id} // Unique key for each task item
          task={task} // Task object
          editingTaskId={editingTaskId} // ID of the task currently being edited
          editingTaskTitle={editingTaskTitle} // Title of the task currently being edited
          setEditingTaskTitle={(title) => {
            console.log('setEditingTaskTitle called with:', title);
            setEditingTaskTitle(title);
          }} // Function to set the title of the task being edited
          handleKeyDown={handleKeyDown} // Function to handle key down events
          toggleTask={(id) => {
            console.log('toggleTask called with:', id);
            toggleTask(id);
          }} // Function to toggle the completion status of a task
          startEditing={(id) => {
            console.log('startEditing called with:', id);
            startEditing(id);
          }} // Function to start editing a task
          cancelEditing={() => {
            console.log('cancelEditing called');
            cancelEditing();
          }} // Function to cancel editing a task
          updateTask={(id) => {
            console.log('updateTask called with:', editingTaskTitle);
            updateTask(id, editingTaskTitle);
            console.log('Task updated with new title:', editingTaskTitle);
          }} // Function to update a task
          deleteTask={(id) => {
            console.log('deleteTask called with:', id);
            deleteTask(id);
          }} // Function to delete a task
          formatDate={formatDate} // Function to format the date
          timeZone={timeZone} // Time zone for date formatting
        />
      ))}
    </ul>
  );
}
