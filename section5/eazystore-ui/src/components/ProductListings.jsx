import React from "react";
import ProductCard from "./ProductCard";

export default function ProductListings({ products }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center col-span-3 font-primary">No products found</p>
        )}
      </div>
    </div>
  );
}
