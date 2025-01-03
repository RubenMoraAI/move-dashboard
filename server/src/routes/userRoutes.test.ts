import request from 'supertest';
import express from 'express';
import userRoutes from './userRoutes';
import { getUsers } from '../controllers/userController';

jest.mock('../controllers/userController');

const app = express();
app.use('/users', userRoutes);

describe('User Routes', () => {
  it('should get users', async () => {
    (getUsers as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, name: 'John Doe' }]);
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'John Doe' }]);
  });

  it('should handle errors', async () => {
    (getUsers as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});