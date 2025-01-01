"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const sortedTasks = response.data.data.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return a.completed - b.completed;
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post("/api/tasks", { title: newTask });
      setTasks([response.data.data, ...tasks]);
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed: !completed, completedAt: !completed ? new Date() : null });
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
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
    try {
      await axios.put(`/api/tasks/${id}`, { title: editingTaskTitle });
      fetchTasks();
      cancelEditing();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date(date));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <div className="mt-0 mb-20 pt-0 pb-8 flex items-center justify-center">
          <input
            type="text"
            className="border p-2 mr-2 rounded text-black"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, addTask)}
            autoFocus
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <ul className="text-center ">
          {tasks.map((task, index) => (
            <div key={task._id}>
              <li className="grid grid-cols-3 gap-4 justify-center text-left items-center mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                    className="mr-2"
                  />
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      className="border p-2 mr-2 w-full rounded text-black"
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => updateTask(task._id))}
                      autoFocus
                    />
                  ) : (
                    <span className={task.completed ? "line-through" : ""}>
                      {task.title}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 flex flex-col items-start">
                  <div>Created: {formatDate(task.createdAt)} ({timeZone})</div>
                  <div>Updated: {formatDate(task.updatedAt)} ({timeZone})</div>
                  {task.completedAt && <div>Completed: {formatDate(task.completedAt)} ({timeZone})</div>}
                </div>
                <div className="flex justify-end items-center space-x-2">
                  {editingTaskId === task._id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => updateTask(task._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="space-x-2 flex justify-end items-center">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                        onClick={() => startEditing(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
              {index < tasks.length - 1 && <hr className="my-4" />}
            </div>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}