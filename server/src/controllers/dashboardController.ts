import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );
    
    const multiAreaSummary = await prisma.$queryRawUnsafe(`
   SELECT
  DATE_TRUNC('month', COALESCE(ss.date, ps.date, es.date)) AS date, 
  SUM(COALESCE(ss."totalValue", 0)) AS sales,
  SUM(COALESCE(ps."totalPurchased", 0)) AS purchases,
  SUM(COALESCE(es."totalExpenses", 0)) AS expenses
FROM 
  (SELECT date, "totalValue" FROM "SalesSummary") ss
FULL OUTER JOIN
  (SELECT date, "totalPurchased" FROM "PurchaseSummary") ps
ON DATE_TRUNC('day', ss.date) = DATE_TRUNC('day', ps.date)
FULL OUTER JOIN
  (SELECT date, "totalExpenses" FROM "ExpenseSummary") es
ON DATE_TRUNC('day', COALESCE(ss.date, ps.date)) = DATE_TRUNC('day', es.date)
GROUP BY DATE_TRUNC('month', COALESCE(ss.date, ps.date, es.date))
ORDER BY date ASC;
    `);
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
      multiAreaSummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
