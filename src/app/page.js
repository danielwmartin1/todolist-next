"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    setTasks(response.data.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    const response = await axios.post("/api/tasks", { title: newTask });
    setTasks([...tasks, response.data.data]);
    setNewTask("");
  };

  const toggleTask = async (id, completed) => {
    await axios.put(`/api/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center mb-2">
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              className={
                task.completed ? "line-through cursor-pointer" : "cursor-pointer"
              }
            >
              {task.title}
            </span>
            <button
              className="bg-red-500 text-white px-4 py-2"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}