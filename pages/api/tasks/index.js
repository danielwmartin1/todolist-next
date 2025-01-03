import connectDB from '../../../utils/db';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { method } = req;

console.log (process.env.MONGODB_URI);

  try {
    await connectDB();

    switch (method) {
      case 'POST':
        const { title, completed, completedAt, deletedAt, location } = req.body;

        if (!title) {
          return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = new Task({
          title,
          completed,
          completedAt,
          deletedAt,
          location,
        });

        await newTask.save();

        res.status(201).json({ message: 'Task created successfully', task: newTask });
        break;

      case 'GET':
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        const tasks = await Task.find({ deletedAt: { $exists: false } });
        res.status(200).json({ tasks });
        break;

      case 'PUT':
        const { id } = req.query;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: updatedTask });
        break;

      case 'PATCH':
        const { id: patchId } = req.query;
        const patchedTask = await Task.findByIdAndUpdate(patchId, req.body, { new: true });
        if (!patchedTask) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: patchedTask });
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        const deletedTask = await Task.findByIdAndUpdate(deleteId, { deletedAt: new Date() }, { new: true });
        if (!deletedTask) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: deletedTask });
        break;

      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(504).json({ message: 'Server timeout, please try again later' });
  }
}