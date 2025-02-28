"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

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
      const validTasks = fetchedTasks.filter(task => !isNaN(new Date(task.createdAt).getTime()));
      setTasks(validTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          handleKeyDown={handleKeyDown}
        />
        <hr id="hr" className="my-4" />
        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          editingTaskTitle={editingTaskTitle}
          setEditingTaskTitle={setEditingTaskTitle}
          handleKeyDown={handleKeyDown}
          toggleTask={toggleTask}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          updateTask={updateTask}
          deleteTask={deleteTask}
          formatDate={formatDate}
          timeZone={timeZone}
        />
      </main>
      <Footer />
    </div>
  );
}