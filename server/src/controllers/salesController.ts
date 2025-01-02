import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSales = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const sales = await prisma.sales.findMany();
     
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sales" });
  }
};
