import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getSales } from "./salesController";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    sales: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;

describe("Sales Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get sales successfully", async () => {
    const sales = [{ id: 1, amount: 100 }];
    (prismaMock.sales.findMany as jest.Mock).mockResolvedValue(sales);

    await getSales(req as Request, res as Response);

    expect(prismaMock.sales.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(sales);
  });

  it("should handle errors when getting sales", async () => {
    const error = new Error("Error retrieving sales");
    (prismaMock.sales.findMany as jest.Mock).mockRejectedValue(error);

    await getSales(req as Request, res as Response);

    expect(prismaMock.sales.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving sales" });
  });
});