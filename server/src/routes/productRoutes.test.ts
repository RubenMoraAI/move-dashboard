import request from 'supertest';
import express from 'express';
import productRoutes from './productRoutes';
import { createProduct, getProducts } from '../controllers/productController';

jest.mock('../controllers/productController');

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

describe('Product Routes', () => {
  it('should get products', async () => {
    (getProducts as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, name: 'Product 1' }]);
    });

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: 'Product 1' }]);
  });

  it('should create a product', async () => {
    const newProduct = { name: 'New Product', price: 100 };
    (createProduct as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({ id: 1, ...newProduct });
    });

    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: 'New Product', price: 100 });
  });

  it('should handle errors when getting products', async () => {
    (getProducts as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).get('/products');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });

  it('should handle errors when creating a product', async () => {
    (createProduct as jest.Mock).mockImplementation((req, res) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });

    const response = await request(app).post('/products').send({ name: 'New Product', price: 100 });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});