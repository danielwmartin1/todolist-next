import axios from "axios"; // Import axios for making HTTP requests

// Fetch tasks from the server
export const fetchTasks = async (dispatch) => {
  try {
    const response = await axios.get("/api/tasks");
    const fetchedTasks = response.data.tasks || [];
    if (!Array.isArray(fetchedTasks)) {
      throw new Error("Fetched tasks is not an array");
    }
    const validTasks = fetchedTasks.filter(task => !isNaN(new Date(task.createdAt).getTime()));
    dispatch({ type: 'SET_TASKS', payload: validTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};
