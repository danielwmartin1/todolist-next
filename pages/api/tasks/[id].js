import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectDB();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "PATCH":
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
        const deletedTask = await Task.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        if (!deletedTask) return res.status(404).json({ success: false });
        res.status(200).json({ success: true, data: deletedTask });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}