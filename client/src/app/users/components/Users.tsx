"use client";

import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useGetUsersQuery } from "@/state/api"; 
import DataGridWrapper from "@/app/(components)/DataGridWrapper/DataGridWrapper";
import { MapPin, Mail, CheckCircle } from "lucide-react";

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-4">
        Failed to fetch users
      </div>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "ID",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500 w-5 h-5" />
          <span>{params.row.name}</span>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const email = params.row.email;

        return (
          <a
            href={`mailto:${email}`}
            className="flex items-center text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-500"
          >
            <Mail className="w-5 h-5 mr-2" />
            {email}
          </a>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      headerClassName: "custom-header",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const { latitude, longitude } = params.row;
 
        const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        return (
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-500"
          >
            <MapPin className="w-5 h-5 mr-2" />
            View Map
          </a>
        );
      },
    },
  ];

  return (
    <DataGridWrapper
      title="Users"
      rows={users}
      columns={columns}
      getRowId={(row) => row.userId}
    />
  );
};

export default Users;
