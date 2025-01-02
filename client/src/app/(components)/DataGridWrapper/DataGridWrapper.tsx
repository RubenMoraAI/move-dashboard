"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import { dataGridStyles } from "./dataGridStyles";

interface DataGridWrapperProps {
  title: string;
  rows: any[];
  columns: GridColDef[];
  getRowId: (row: any) => string | number;
}

const DataGridWrapper = ({ title, rows, columns, getRowId }: DataGridWrapperProps) => {
  return (
    <div className="flex flex-col">
      <Header name={title} />
      <div className="w-full mt-5">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          checkboxSelection
          className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 !text-gray-700 dark:!text-gray-300"
          sx={dataGridStyles}
        />
      </div>
    </div>
  );
};

export default DataGridWrapper;
