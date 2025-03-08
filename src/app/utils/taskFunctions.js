import axios from "axios"; // Import axios for making HTTP requests

// Add a new task
export const addTask = async (state, dispatch, fetchTasks) => {
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
export const toggleTask = async (id, completed, state, dispatch, fetchTasks) => {
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
export const deleteTask = async (id, state, dispatch, fetchTasks) => {
  try {
    await axios.delete(`/api/tasks/${id}`); // Make a DELETE request to delete a task
    fetchTasks(); // Fetch tasks after deleting a task
    dispatch({ type: 'SET_TASKS', payload: state.tasks.filter(task => task._id !== id) }); // Update tasks state
  } catch (error) {
    console.error("Failed to delete task:", error); // Log error if deleting task fails
  }
};

// Start editing a task
export const startEditing = (task, dispatch) => {
  dispatch({ type: 'SET_EDITING_TASK_ID', payload: task._id }); // Set the ID of the task being edited
  dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: task.title }); // Set the title of the task being edited
};

// Cancel editing a task
export const cancelEditing = (dispatch) => {
  dispatch({ type: 'SET_EDITING_TASK_ID', payload: null }); // Clear the ID of the task being edited
  dispatch({ type: 'SET_EDITING_TASK_TITLE', payload: "" }); // Clear the title of the task being edited
};

// Update a task
export const updateTask = async (id, state, dispatch, fetchTasks) => {
  if (state.editingTaskTitle === state.tasks.find(task => task._id === id).title) {
    cancelEditing(dispatch); // Cancel editing if the title hasn't changed
    return;
  }
  try {
    await axios.put(`/api/tasks/${id}`, { title: state.editingTaskTitle }); // Make a PUT request to update the task
    fetchTasks(); // Fetch tasks after updating the task
    cancelEditing(dispatch); // Cancel editing
  } catch (error) {
    console.error("Failed to update task:", error); // Log error if updating task fails
  }
};

// Format date according to the time zone
export const formatDate = (date, timeZone) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
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
export const handleKeyDown = (e, action, cancelAction) => {
  if (e.key === "Enter") {
    action(); // Call action if Enter key is pressed
  } else if (e.key === "Escape" && cancelAction) {
    cancelAction(); // Call cancelAction if Escape key is pressed
  }
};
