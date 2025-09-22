"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import topSellingProductsData from "@/data/topSellingProducts.json";

const TopSellingProducts = () => {
  const { topSellingProducts } = topSellingProductsData;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {topSellingProducts.title}
        </h2>
        <p className="text-gray-600 text-lg">
          {topSellingProducts.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topSellingProducts.products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-32 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-600 ml-1">
                  {product.rating}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {product.price}
                </span>
                <span className="text-xs text-gray-500">
                  {product.soldCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
