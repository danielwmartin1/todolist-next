import connectDB from "../../../utils/db";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectDB();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}