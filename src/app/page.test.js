// FILE: src/app/page.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from './page';

jest.mock('axios');

describe('Home Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { tasks: [] } });
    });
  });

  it('should fetch and display tasks on load', async () => {
    const tasks = [
      { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { _id: '2', title: 'Task 2', completed: true, createdAt: new Date(), updatedAt: new Date() }
    ];
    axios.get.mockResolvedValueOnce({ data: { tasks } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('should handle error when fetching tasks', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch tasks'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });

  it('should add a new task', async () => {
    axios.post.mockResolvedValueOnce({ data: { task: { _id: '3', title: 'New Task', completed: false, createdAt: new Date(), updatedAt: new Date() } } });

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText('New Task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  it('should handle error when adding a new task', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to add task'));

    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText('New Task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    });
  });

  it('should toggle task completion', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() };
    axios.get.mockResolvedValueOnce({ data: { tasks: [task] } });
    axios.patch.mockResolvedValueOnce({ data: { task: { ...task, completed: true } } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    fireEvent.change(screen.getByPlaceholderText('New Task'), { target: { value: 'New Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  it('should toggle task completion', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() };
    axios.get.mockResolvedValueOnce({ data: { tasks: [task] } });
    axios.patch.mockResolvedValueOnce({ data: { task: { ...task, completed: true } } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  it('should delete a task', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() };
    axios.get.mockResolvedValueOnce({ data: { tasks: [task] } });
    axios.delete.mockResolvedValueOnce({});

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    });
  });

  it('should start editing a task', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() };
    axios.get.mockResolvedValueOnce({ data: { tasks: [task] } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
    });
  });

  it('should update a task', async () => {
    const task = { _id: '1', title: 'Task 1', completed: false, createdAt: new Date(), updatedAt: new Date() };
    axios.get.mockResolvedValueOnce({ data: { tasks: [task] } });
    axios.put.mockResolvedValueOnce({});
    axios.get.mockResolvedValueOnce({ data: { tasks: [{ ...task, title: 'Updated Task' }] } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByDisplayValue('Task 1'), { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(screen.getByText('Updated Task')).toBeInTheDocument();
    });
  });