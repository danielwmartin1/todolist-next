import connectDB from '../../../utils/connectDB';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { method } = req;
  try {
    await connectDB(); // Connect to the database

    switch (method) {
      // Handle GET request to fetch tasks
      case 'GET':
        const tasks = await Task.find({ deletedAt: { $exists: false } });
        res.status(200).json({ tasks });
        break;
      // Handle POST request to create a new task
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
      // Handle PUT request to update a task
      case 'PUT':
        const { id } = req.query;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: updatedTask });
        break;
      // Handle DELETE request to soft delete a task
      case 'DELETE':
        const { id: deleteId } = req.query;
        const deletedTask = await Task.findByIdAndUpdate(deleteId, { deletedAt: new Date() }, { new: true });
        if (!deletedTask) {
          return res.status(404).json({ success: false, error: "Task not found" });
        }
        res.status(200).json({ success: true, data: deletedTask });
        break;
      // Handle unsupported methods
      default:
        res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}