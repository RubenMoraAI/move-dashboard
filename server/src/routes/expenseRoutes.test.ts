import request from 'supertest';
import express from 'express';
import expenseRoutes from './expenseRoutes';
import { getExpensesByCategory } from '../controllers/expenseController';

jest.mock('../controllers/expenseController');

const app = express();
app.use('/expenses', expenseRoutes);

describe('Expense Routes', () => {
  it('should get expenses by category', async () => {
    (getExpensesByCategory as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ expenses: 'some expenses data' });
    });

    const response = await request(app).get('/expenses');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ expenses: 'some expenses data' });
  });

  it('should handle errors', async () => {
    (getExpensesByCategory as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).get('/expenses');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});