import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getExpensesByCategory } from "./expenseController";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    expenseByCategory: {
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prismaMock = new PrismaClient() as jest.Mocked<PrismaClient>;

describe("Expense Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should get expenses by category successfully", async () => {
    const expenses = [
      { id: 1, category: "Food", amount: 100, date: new Date() },
    ];
    (prismaMock.expenseByCategory.findMany as jest.Mock).mockResolvedValue(expenses);

    await getExpensesByCategory(req as Request, res as Response);

    const expectedExpenses = expenses.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    expect(prismaMock.expenseByCategory.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expectedExpenses);
  });

  it("should handle errors when getting expenses by category", async () => {
    const error = new Error("Error retrieving expenses by category");
    (prismaMock.expenseByCategory.findMany as jest.Mock).mockRejectedValue(error);

    await getExpensesByCategory(req as Request, res as Response);

    expect(prismaMock.expenseByCategory.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving expenses by category",
    });
  });
});