import connectDB from "../../../utils/db";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find({ deletedAt: { $exists: false } });
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PATCH":
      try {
        const { id } = req.query;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const task = await Task.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        if (!task) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}