// filepath: /C:/Users/danie/OneDrive/Coding/Projects/todolist-next/todolist-next/src/app/page.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Home from './page';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('fetchTasks', () => {
  it('fetches tasks successfully', async () => {
    const tasks = [
      { _id: '1', title: 'Task 1', createdAt: '2023-01-01T00:00:00Z', updatedAt: '2023-01-01T00:00:00Z' },
      { _id: '2', title: 'Task 2', createdAt: '2023-01-02T00:00:00Z', updatedAt: '2023-01-02T00:00:00Z' }
    ];
    axios.get.mockResolvedValue({ data: { tasks } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('fetches an empty array of tasks', async () => {
    axios.get.mockResolvedValue({ data: { tasks: [] } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });

  it('handles non-array response', async () => {
    axios.get.mockResolvedValue({ data: { tasks: {} } });

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });

  it('handles fetch error', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch tasks'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });
});

describe('addTask', () => {
  it('adds a new task successfully', async () => {
    const newTask = { _id: '3', title: 'New Task', createdAt: '2023-01-03T00:00:00Z', updatedAt: '2023-01-03T00:00:00Z' };
    // Add your test implementation here
  });
});