import * as fs from "fs";

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number;
  date: string;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const generateRandomValue = (): number => {
  return parseFloat((Math.random() * 150000000).toFixed(2));
};

const generateRandomPercentage = (): number => {
  return parseFloat((Math.random() * 200 - 100).toFixed(2));
};

const generateMonthlyDates = (): string[] => {
  const dates: string[] = [];
  const currentDate = new Date();
  const startYear = currentDate.getFullYear() - 5;

  for (let year = startYear; year <= currentDate.getFullYear(); year++) {
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      if (date <= currentDate) {
        dates.push(date.toISOString());
      }
    }
  }

  return dates;
};

const generatePurchaseSummaries = (): PurchaseSummary[] => {
  const dates = generateMonthlyDates();
  return dates.map((date) => ({
    purchaseSummaryId: generateUUID(),
    totalPurchased: generateRandomValue(),
    changePercentage: generateRandomPercentage(),
    date,
  }));
};

const generateSalesSummaries = (): SalesSummary[] => {
  const dates = generateMonthlyDates();
  return dates.map((date) => ({
    salesSummaryId: generateUUID(),
    totalValue: generateRandomValue(),
    changePercentage: generateRandomPercentage(),
    date,
  }));
};

const generateExpenseSummaries = (): ExpenseSummary[] => {
  const dates = generateMonthlyDates();
  return dates.map((date) => ({
    expenseSummaryId: generateUUID(),
    totalExpenses: generateRandomValue(),
    date,
  }));
};

const writeJSONFile = (filename: string, data: object): void => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`File generated: ${filename}`);
};

const purchaseSummaries = generatePurchaseSummaries();
writeJSONFile("purchaseSummaries.json", purchaseSummaries);

const salesSummaries = generateSalesSummaries();
writeJSONFile("salesSummaries.json", salesSummaries);

const expenseSummaries = generateExpenseSummaries();
writeJSONFile("expenseSummaries.json", expenseSummaries);
