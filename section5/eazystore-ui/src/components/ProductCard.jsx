import React from "react";
import Price from "./Price";

export default function ProductCard({ product }) {
  return (
    <div className="w-72 rounded-md mx-auto border-gray-300 border shadow-sm hover:shadow-lg transition-shadow duration-300 product-card">
      <div className="relative h-72 w-full overflow-hidden rounded-t-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-primary text-gray-800">{product.name}</h2>
        <p className="text-gray-600 font-primary">{product.description}</p>
        <div className="mt-4">
          <Price currency="$" price={product.price} />
          </div>
        </div>
      </div>
  );
}
