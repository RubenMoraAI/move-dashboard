import { useState, useEffect } from "react";
import { useGetProductsQuery } from "@/state/api";

export const useProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data: products, isLoading, isError } = useGetProductsQuery(
    debouncedSearchTerm.length > 2 ? debouncedSearchTerm : ""
  );

  useEffect(() => {
    const handler = setTimeout(() => { 
      if (searchTerm.length > 2) {
        setDebouncedSearchTerm(searchTerm);
      } else {
        setDebouncedSearchTerm("");
      }
    }, 800);

    return () => {
      clearTimeout(handler); 
    };
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    setSearchTerm,
    products,
    isLoading,
    isError,
    handleSearchChange,
  };
};
