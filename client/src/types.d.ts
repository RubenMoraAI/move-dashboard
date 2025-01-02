
export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
    multiAreaSummary: MultiAreaSummary[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
    latitude: string;
    longitude: string;
}

export interface Sale {
    saleId: string;
    latitude: number;
    longitude: number;
    totalAmount: number;
}

export interface MultiAreaSummaryData {
    date: string;
    sales: number;
    purchases: number;
    expenses: number;
}
export interface GeolocatedSale {
    saleId: string;
    latitude: string;
    longitude: string;
    totalAmount: number;
    productId: string;
    quantity: number;
    unitPrice: number;
  }
  