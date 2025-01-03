import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../../(components)/Rating";
import Image from "next/image";

interface CardPopularProductsProps {
  cssProperty?: string;
}

const CardPopularProducts = ({ cssProperty }: CardPopularProductsProps) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <div
      className={`bg-white dark:bg-gray-700 shadow-md rounded-2xl pb-16 ${cssProperty}`}
    >
      {isLoading ? (
        <div className="m-5 text-gray-700 dark:text-gray-300">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2 text-gray-700 dark:text-gray-200">
            Popular Products
          </h3>
          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex flex-col h-full">
            <div className="overflow-auto h-full">
              {dashboardMetrics?.popularProducts.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between gap-3 px-2 xl:px-5 py-7 border-b border-gray-300 dark:border-gray-600"
                >
                  <div className="flex items-center gap-2  shrink-1">
                    <Image
                      src={`/products/product${Math.floor(Math.random() * 3) + 1
                        }.png`}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg w-14 h-14 shrink-0"
                    />
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700 dark:text-gray-200 truncate">
                        {product.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-indigo-500 dark:text-indigo-400 text-xs">
                          ${product.price}
                        </span>
                        <span className="text-gray-700 dark:text-gray-400 mx-2">
                          |
                        </span>
                        <Rating rating={product.rating || 0} />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs items-center text-gray-700 dark:text-gray-400 flex-shrink-1 hidden xl:flex">
                    <button className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">
                      <ShoppingBag className="w-[10px] h-[10px] xl:w-4 xl:h-4" />
                    </button>
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </div>
                </div>
              ))}
            </div>
            <div className="pb-6"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
