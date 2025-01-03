import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getDashboardMetrics } from "./dashboardController";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    products: {
      findMany: jest.fn(),
    },
    salesSummary: {
      findMany: jest.fn(),
    },
    purchaseSummary: {
      findMany: jest.fn(),
    },
    expenseSummary: {
      findMany: jest.fn(),
    },
    expenseByCategory: {
      findMany: jest.fn(),
    },
    $queryRawUnsafe: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;

describe("Dashboard Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get dashboard metrics successfully", async () => {
    const popularProducts = [{ id: 1, name: "Product 1", stockQuantity: 100 }];
    const salesSummary = [{ id: 1, date: new Date(), totalValue: 1000 }];
    const purchaseSummary = [{ id: 1, date: new Date(), totalValue: 500 }];
    const expenseSummary = [{ id: 1, date: new Date(), totalValue: 300 }];
    const expenseByCategorySummaryRaw = [
      { id: 1, category: "Food", amount: 100, date: new Date() },
    ];
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));
    const multiAreaSummary = [
      { date: new Date(), sales: 1000, purchases: 500, expenses: 300 },
    ];

    (prismaMock.products.findMany as jest.Mock).mockResolvedValue(popularProducts);
    (prismaMock.salesSummary.findMany as jest.Mock).mockResolvedValue(salesSummary);
    (prismaMock.purchaseSummary.findMany as jest.Mock).mockResolvedValue(purchaseSummary);
    (prismaMock.expenseSummary.findMany as jest.Mock).mockResolvedValue(expenseSummary);
    (prismaMock.expenseByCategory.findMany as jest.Mock).mockResolvedValue(expenseByCategorySummaryRaw);
    prismaMock.$queryRawUnsafe.mockResolvedValue(multiAreaSummary);

    await getDashboardMetrics(req as Request, res as Response);

    expect(prismaMock.products.findMany).toHaveBeenCalled();
    expect(prismaMock.salesSummary.findMany).toHaveBeenCalled();
    expect(prismaMock.purchaseSummary.findMany).toHaveBeenCalled();
    expect(prismaMock.expenseSummary.findMany).toHaveBeenCalled();
    expect(prismaMock.expenseByCategory.findMany).toHaveBeenCalled();
    expect(prismaMock.$queryRawUnsafe).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
      multiAreaSummary,
    });
  });

  it("should handle errors when getting dashboard metrics", async () => {
    const error = new Error("Error retrieving dashboard metrics");
    (prismaMock.products.findMany as jest.Mock).mockRejectedValue(error);

    await getDashboardMetrics(req as Request, res as Response);

    expect(prismaMock.products.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving dashboard metrics",
    });
  });
});