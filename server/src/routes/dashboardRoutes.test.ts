import request from 'supertest';
import express from 'express';
import dashboardRoutes from './dashboardRoutes';
import { getDashboardMetrics } from '../controllers/dashboardController';

jest.mock('../controllers/dashboardController');

const app = express();
app.use('/dashboard', dashboardRoutes);

describe('Dashboard Routes', () => {
  it('should get dashboard metrics', async () => {
    (getDashboardMetrics as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ metrics: 'some metrics data' });
    });

    const response = await request(app).get('/dashboard');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ metrics: 'some metrics data' });
  });

  it('should handle errors', async () => {
    (getDashboardMetrics as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).get('/dashboard');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});