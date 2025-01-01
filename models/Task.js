import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  deletedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
