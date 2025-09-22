"use client";

import React from "react";
import Image from "next/image";
import productCatalogueData from "@/data/productCatalogue.json";

const ProductCatalogue = () => {
  const { productCatalogue, sectionVisible } = productCatalogueData;

  // Don't render the entire section if sectionVisible is false
  if (!sectionVisible) {
    return null;
  }

  // Filter out hidden products
  const visibleProducts = productCatalogue.products.filter(product => product.visible);

  // Don't render if no products are visible
  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {productCatalogue.title}
        </h2>
        <p className="text-gray-600 text-lg">
          {productCatalogue.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalogue;
