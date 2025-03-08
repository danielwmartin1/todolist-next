import { useEffect } from "react";
import { fetchTasks } from "../utils/fetchFunctions"; // Import fetchTasks function

const useFetchTasks = (dispatch) => {
  useEffect(() => {
    fetchTasks(dispatch);
    dispatch({ type: 'SET_TIME_ZONE', payload: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }, [dispatch]);

  return () => fetchTasks(dispatch);
};

export default useFetchTasks;
