"use client";

export default function TaskItem({
  task,
  editingTaskId,
  editingTaskTitle,
  setEditingTaskTitle,
  handleKeyDown,
  toggleTask,
  startEditing,
  cancelEditing,
  updateTask,
  deleteTask,
  formatDate,
  timeZone
}) {
  return (
    <div id="list" key={task._id} className="w-full flex">
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
                className="bg-orange-500 text-white px-4 py-2 rounded"
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
    </div>
  );
}
