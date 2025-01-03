import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getProducts, createProduct } from "./productController";

jest.mock("@prisma/client", () => {
    const mPrismaClient = {
      products: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
  });
  
  const prismaMock = new (jest.requireMock("@prisma/client").PrismaClient)();

describe("Product Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get products successfully", async () => {
    const products = [{ name: "Product 1", productId: "1", price: 100, rating: null, stockQuantity: 0 }];
    prismaMock.products.findMany.mockResolvedValue(products);

    await getProducts(req as Request, res as Response);

    expect(prismaMock.products.findMany).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(products);
  });

  it("should handle errors when getting products", async () => {
    const error = new Error("Error retrieving products");
    (prismaMock.products.findMany as jest.MockedFunction<typeof prismaMock.products.findMany>).mockRejectedValue(error);

    await getProducts(req as Request, res as Response);

    expect(prismaMock.products.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving products" });
  });

  it("should create a product successfully", async () => {
    const newProduct = { name: "New Product", price: 100 };
    const createdProduct = { productId: "1", rating: null, stockQuantity: 0, ...newProduct };
    (prismaMock.products.create as jest.MockedFunction<typeof prismaMock.products.create>).mockResolvedValue(createdProduct);

    req.body = newProduct;
    await createProduct(req as Request, res as Response);

    expect(prismaMock.products.create).toHaveBeenCalledWith({ data: newProduct });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdProduct);
  });

  it("should handle errors when creating a product", async () => {
    const error = new Error("Error creating product");
    (prismaMock.products.create as jest.MockedFunction<typeof prismaMock.products.create>).mockRejectedValue(error);

    req.body = { name: "New Product", price: 100 };
    await createProduct(req as Request, res as Response);

    expect(prismaMock.products.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error creating product" });
  });
});