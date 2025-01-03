import { act, renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Wrapper } from './store.util-test';
import { api } from './api';

describe('Dashboard Metrics API', () => {
  it('fetches dashboard metrics successfully', async () => {
    const mockData = {
      salesSummary: [
        {
          salesSummaryId: "c85efa84-d294-4c2e-a9a5-8774d92af8bf",
          totalValue: 2882180.14,
          changePercentage: 57.29,
          date: "2024-03-13T01:19:11.000Z",
        },
        {
          salesSummaryId: "6f673a1d-78e9-4ea8-91e2-d7a32836cd3a",
          totalValue: 1518126.03,
          changePercentage: 22.59,
          date: "2024-02-17T06:29:57.000Z",
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => api.endpoints.getDashboardMetrics.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('handles error when fetching dashboard metrics', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => api.endpoints.getDashboardMetrics.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(expect.objectContaining({
      "error": "Error: Failed to fetch",
      "status": "FETCH_ERROR",
    }));
  });
  it('creates a product successfully', async () => {
    const newProduct = { name: "New Product", price: 150, stockQuantity: 100 };
    fetchMock.mockResponseOnce(JSON.stringify(newProduct));

    const { result } = renderHook(() => api.endpoints.createProduct.useMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      const [createProduct] = result.current;
      await createProduct(newProduct);
    });

    await waitFor(() => expect(result.current[1].isSuccess).toBe(true));
    expect(result.current[1].data).toEqual(newProduct);
  });
  it('handles error when creating a product', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to create product'));

    const { result } = renderHook(() => api.endpoints.createProduct.useMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      const [createProduct] = result.current;
      createProduct({ name: "New Product", price: 150, stockQuantity: 100 });
    });

    await waitFor(() => expect(result.current[1].isError).toBe(true));
    expect(result.current[1].error).toEqual(expect.objectContaining({
      "error": "Error: Failed to create product",
      "status": "FETCH_ERROR",
    }));
  });
});
describe('Products API', () => {
  it('fetches products successfully', async () => {
    const mockData = [
      {
        id: "1",
        name: "Product 1",
        price: 100,
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => api.endpoints.getProducts.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('handles error when fetching products', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => api.endpoints.getProducts.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(expect.objectContaining(
      {
        "error": "Error: Failed to fetch",
        "status": "FETCH_ERROR",
      }
    ));
  });
});

describe('Create Product API', () => {
  it('creates a product successfully', async () => {
    const newProduct = {
      name: "New Product",
      price: 150,
      stockQuantity: 100,
    };

    const mockResponse = {
      id: "3",
      ...newProduct,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { result } = renderHook(() => api.endpoints.createProduct.useMutation(), {
      wrapper: Wrapper,
    });

    await act(async () => {
      const [createProduct] = result.current;
      await createProduct(newProduct);
    });

    await waitFor(() => expect(result.current[1].isSuccess || result.current[1].isError).toBe(true));

    expect(result.current[1].isSuccess).toBe(true);
    expect(result.current[1].data).toEqual(mockResponse);
  });

  it('handles error when creating a product', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to create'));

    const { result } = renderHook(() => api.endpoints.createProduct.useMutation(), {
      wrapper: Wrapper,
    });
    await act(async () => {
      const [createProduct] = result.current;
      createProduct({ name: "New Product", price: 150, stockQuantity: 100 });
    });
    await waitFor(() => expect(result.current[1].isError).toBe(true));

    expect(result.current[1].isError).toBe(true);
    expect(result.current[1].error).toEqual(expect.objectContaining(
      {
        "error": "Error: Failed to create",
        "status": "FETCH_ERROR",
      }
    ));
  });
});
describe('Users API', () => {
  it('fetches users successfully', async () => {
    const mockData = [
      {
        id: "1",
        name: "User 1",
        email: "user1@example.com",
      },
      {
        id: "2",
        name: "User 2",
        email: "user2@example.com",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => api.endpoints.getUsers.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('handles error when fetching users', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => api.endpoints.getUsers.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(expect.objectContaining(
      {
        "error": "Error: Failed to fetch",
        "status": "FETCH_ERROR",
      }
    ));
  });
});

describe('Expenses API', () => {
  it('fetches expenses by category successfully', async () => {
    const mockData = [
      {
        category: "Category 1",
        total: 1000,
      },
      {
        category: "Category 2",
        total: 2000,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => api.endpoints.getExpensesByCategory.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('handles error when fetching expenses by category', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => api.endpoints.getExpensesByCategory.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(expect.objectContaining(
      {
        "error": "Error: Failed to fetch",
        "status": "FETCH_ERROR",
      }
    ));
  });
});

describe('Sales API', () => {
  it('fetches sales data successfully', async () => {
    const mockData = [
      {
        id: "1",
        location: "Location 1",
        totalSales: 1000,
      },
      {
        id: "2",
        location: "Location 2",
        totalSales: 2000,
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const { result } = renderHook(() => api.endpoints.getSalesData.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('handles error when fetching sales data', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => api.endpoints.getSalesData.useQuery(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(expect.objectContaining(
      {
        "error": "Error: Failed to fetch",
        "status": "FETCH_ERROR",
      }
    ));
  });
});
