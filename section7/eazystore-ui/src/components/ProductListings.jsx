import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import Dropdown from "./Dropdown";
import SearchBox from "./SearchBox";

export default function ProductListings({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter and sort the products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Apply search filter
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(lowerSearch) ||
        product.description.toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [products, searchTerm, sortBy]);

  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  return (
    <div className="max-w-[1152px] mx-auto">
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBox
          label="Search Stickers"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dropdown
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={(option) => setSortBy(option.value)}
          placeholder="Sort Options"
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        Showing {filteredAndSortedProducts.length} of {products.length} products
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg font-medium mb-2">
              No products found
            </p>
            {searchTerm && (
              <>
                <p className="text-gray-400 mb-4">
                  No results for "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Search
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}