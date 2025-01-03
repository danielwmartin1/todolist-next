// FILE: pages/api/tasks/[id].test.js

jest.mock('../../../utils/connectDB');
jest.mock('../../../models/Task');

describe('API Handler Tests', () => {
  beforeEach(() => {
    connectDB.mockResolvedValue({});
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task if found', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: '1' },
      });

      Task.findById.mockResolvedValue({ _id: '1', name: 'Test Task' });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({ success: true, data: { _id: '1', name: 'Test Task' } });
    });

    it('should return 404 if task not found', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { id: '1' },
      });

      Task.findById.mockResolvedValue(null);

      await handler(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({ success: false });
    });
  });

  describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
          const { req, res } = createMocks({
            method: 'POST',
            body: { name: 'New Task' },
          });
    
          Task.create.mockResolvedValue({ _id: '2', name: 'New Task' });
    
          await handler(req, res);
    
          expect(res._getStatusCode()).toBe(201);
          expect(JSON.parse(res._getData())).toEqual({ success: true, data: { _id: '2', name: 'New Task' } });
        });
      });
    });