"use client";

import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
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
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={task._id}
          task={task}
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
      ))}
    </ul>
  );
}
