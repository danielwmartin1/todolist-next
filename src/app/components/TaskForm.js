"use client";

export default function TaskForm({ newTask, setNewTask, addTask, handleKeyDown }) {
  return (
    <div className="pt-0 flex flex-col sm:flex-row items-center justify-center">
      <input
        type="text"
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, addTask, () => setNewTask(""))}
        autoFocus
      />
      <button
        style={{ minWidth: "50%" }}
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}
