import request from 'supertest';
import express from 'express';
import salesRoutes from './salesRoutes';
import { getSales } from '../controllers/salesController';

jest.mock('../controllers/salesController');

const app = express();
app.use('/sales', salesRoutes);

describe('Sales Routes', () => {
  it('should get sales', async () => {
    (getSales as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ sales: 'some sales data' });
    });

    const response = await request(app).get('/sales');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ sales: 'some sales data' });
  });

  it('should handle errors', async () => {
    (getSales as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).get('/sales');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});