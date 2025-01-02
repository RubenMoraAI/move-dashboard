"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "@/state/api";
import DataGridWrapper from "../../(components)/DataGridWrapper/DataGridWrapper";
import { CheckCircle, ArrowUp, ArrowDown, Eye } from "lucide-react";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  const allColumns: GridColDef[] = [
    { field: "productId", headerName: "ID",headerClassName: "custom-header", flex: 0.5, minWidth: 90 },
    { field: "name", headerName: "Product Name",headerClassName: "custom-header", flex: 1, minWidth: 150 },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "custom-header",
      flex: 0.8,
      minWidth: 110,
      type: "number",
      valueGetter: (_value, row) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: "Rating",headerClassName: "custom-header",
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => {
        const rating = params.row.rating;
        return (
          <div className="flex items-center gap-2">
            {rating >= 4 ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <Eye className="text-red-500 w-5 h-5" />
            )}
            <span>{rating}</span>
          </div>
        );
      },
    },
    {
      field: "stockQuantity",
      headerName: "Stock Quantity",headerClassName: "custom-header",
      flex: 0.9,
      minWidth: 120,
      renderCell: (params) => {
        const stock = params.row.stockQuantity;
        return (
          <div className="flex items-center gap-2">
            {stock > 500000 ? (
              <ArrowUp className="text-indigo-500 w-5 h-5" />
            ) : (
              <ArrowDown className="text-red-500 w-5 h-5" />
            )}
            <span>{stock}</span>
          </div>
        );
      },
    },
  ];

  const filteredColumns = isMediumScreen
    ? allColumns.filter((column) => column.field !== "productId" && column.field !== "rating")
    : allColumns;

  return (
    <DataGridWrapper
      title="Inventory"
      rows={products}
      columns={filteredColumns}
      getRowId={(row) => row.productId}
    />
  );
};

export default Inventory;
