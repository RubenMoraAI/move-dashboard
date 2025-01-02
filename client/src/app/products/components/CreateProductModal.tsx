"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    rating: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      price: "",
      stockQuantity: "",
      rating: "",
    };

    if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters.";
      isValid = false;
    }

    if (!formData.price || +formData.price <= 0) {
      newErrors.price = "Price must be a valid number greater than 0.";
      isValid = false;
    }

    if (
      formData.stockQuantity == null ||
      +formData.stockQuantity < 0
    ) {
      newErrors.stockQuantity = "Stock quantity must be a non-negative number.";
      isValid = false;
    }

    if (
      formData.rating == null ||
      isNaN(+formData.rating) ||
      +formData.rating < 0 ||
      +formData.rating > 5
    ) {
      newErrors.rating = "Rating must be a number between 0 and 5.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? value === "" ? "" : parseFloat(value.replace(",", "."))
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 dark:border-gray-700 border-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200";

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-700">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price || ""}
            className={inputCssStyles}
            required
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity || ""}
            className={inputCssStyles}
            required
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm">{errors.stockQuantity}</p>
          )}

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating || ""}
            className={inputCssStyles}
            required
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

          {/* CREATE ACTIONS */}
          <div className="mt-4 flex justify-between gap-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-700 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 dark:bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
