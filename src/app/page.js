"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

import './styles.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const fetchedTasks = response.data.tasks || [];
      if (!Array.isArray(fetchedTasks)) {
        throw new Error("Fetched tasks is not an array");
      }
      setTasks(fetchedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask) return;
    try {
      await axios.post("/api/tasks", { title: newTask });
      fetchTasks();
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { completed });
      fetchTasks();
      if (response.data.task) {
        setTasks(tasks.map(task => task._id === id ? response.data.task : task));
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
      setTasks(tasks.filter(task => task._id !== id));
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

  const handleKeyDown = (e, action, cancelAction) => {
    if (e.key === "Enter") {
      action();
    } else if (e.key === "Escape" && cancelAction) {
      cancelAction();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <div className="pt-0 flex flex-col sm:flex-row items-center justify-center">
          <input
            type="text"
            className="border p-2 mb-2 sm:mb-0 sm:mr-2 rounded text-black w-full sm:w-auto"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, addTask, () => setNewTask(""))}
            autoFocus
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded sm:w-auto"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <hr id="hr" className="my-4" />
        <ul className="text-center w-full">
          {tasks.map((task, index) => (
            <div key={task._id} className="w-full flex">
              <li id="listItem" className="grid grid-cols-1 sm:grid-cols-3 justify-center text-left items-center">
                <div id="listCheck" className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, !task.completed)}
                    className="mr-2"
                  />
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      className="border p-2 mr-2 w-full rounded text-black"
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => updateTask(task._id), cancelEditing)}
                      autoFocus
                    />
                  ) : (
                    <span className={`text-lg ${task.completed ? "line-through" : ""}`}>
                      {task.title}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500 flex flex-col items-start m-16">
                  <div>Created: {formatDate(task.createdAt)} ({timeZone})</div>
                  <div>Updated: {formatDate(task.updatedAt)} ({timeZone})</div>
                  {task.completedAt && <div>Completed: {formatDate(task.completedAt)} ({timeZone})</div>}
                </div>
                <div className="flex justify-end items-center space-x-2">
                  {editingTaskId === task._id ? (
                    <div className="space-x-2 flex justify-end items-center">
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
                    </div>
                  ) : (
                    <div className="space-x-2 flex justify-end items-center mx-4">
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