import { useEffect } from "react";
import axios from "axios";

const useFetchTasks = (dispatch) => {
  const fetchTasks = async () => {
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

  useEffect(() => {
    fetchTasks();
    dispatch({ type: 'SET_TIME_ZONE', payload: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }, [dispatch]);

  return fetchTasks;
};

export default useFetchTasks;
