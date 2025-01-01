"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("/api/tasks");
    const sortedTasks = response.data.data.sort((a, b) => {
      if (a.completed === b.completed) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.completed - b.completed;
    });
    setTasks(sortedTasks);
  };

  const addTask = async () => {
    if (!newTask) return;
    const response = await axios.post("/api/tasks", { title: newTask });
    setTasks([response.data.data, ...tasks]);
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

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  const updateTask = async (id) => {
    if (editingTaskTitle === tasks.find(task => task._id === id).title) {
      cancelEditing();
      return;
    }
    await axios.put(`/api/tasks/${id}`, { title: editingTaskTitle });
    fetchTasks();
    cancelEditing();
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
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  className="border p-2 mr-2"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                  onClick={() => updateTask(task._id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTask(task._id, task.completed)}
                  className={
                    task.completed ? "line-through cursor-pointer" : "cursor-pointer"
                  }
                >
                  {task.title}
                </span>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}