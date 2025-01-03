"use client";

import React from "react";
import { PlusCircle, Search } from "lucide-react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./components/CreateProductModal";
import Image from "next/image";
import { useProductSearch } from "./hooks/useProductSearch";
import { useState } from "react";
import { useCreateProductMutation } from "@/state/api";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const ProductsPage = () => {
  const {
    searchTerm,
    handleSearchChange,
    products,
    isLoading,
    isError,
  } = useProductSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Search products(min 3 chars to start)..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-indigo-500 hover:bg-indigo-700 text-gray-200 font-bold py-4 px-4 rounded-lg text-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Create Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.productId}
            className="group border border-indigo-500 shadow hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out rounded-md p-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <div className="flex flex-col items-center">
              <Image
                src={`/products/product${Math.floor(Math.random() * 3) + 1}.png`}
                alt={product.name}
                width={150}
                height={150}
                className="mb-3 rounded-2xl w-36 h-36 transition duration-300 ease-in-out group-hover:border-2 group-hover:border-indigo-400"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="text-sm mt-1">Stock: {product.stockQuantity}</div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default ProductsPage;
