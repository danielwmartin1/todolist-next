"use client";

export default function TaskForm({ newTask, setNewTask, addTask, handleKeyDown }) {
  return (
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
        style={{ minWidth: "50%" }}
        className="bg-blue-500 text-white px-4 py-2 rounded text-center"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
}
