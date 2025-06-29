// src/components/features/products/ProductFilters/ProductFilters.jsx
import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input, Button } from "../../../common";

const ProductFilters = ({
  searchTerm = "",
  onSearchChange,
  categoryFilter = "",
  onCategoryChange,
  categories = [],
  onClearFilters,
  className = "",
}) => {
  const hasActiveFilters = searchTerm || categoryFilter;

  const formatCategoryName = (category) => {
    if (!category || typeof category !== "string") return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div
      className={`bg-white p-4 sm:p-6 rounded-lg shadow-sm border ${className}`}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
        {/* Search Input */}
        <div className="flex-1 min-w-0">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            startIcon={<Search className="w-4 h-4" />}
            className="w-full"
            fullWidth
          />
        </div>

        {/* Category Filter */}
        <div className="w-full lg:min-w-48 lg:w-auto">
          <select
            value={categoryFilter || ""}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {formatCategoryName(category)}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="w-full lg:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={onClearFilters}
              startIcon={<X className="w-4 h-4" />}
              endIcon={""}
              className="w-full lg:w-auto whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Filter Icon for Mobile */}
        <div className="lg:hidden w-full">
          <Button
            variant="outline"
            size="md"
            startIcon={<Filter className="w-4 h-4" />}
            endIcon={""}
            onClick={() => {}}
            className="w-full"
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 sm:mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">
              Active filters:
            </span>

            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                <span className="truncate max-w-32 sm:max-w-none">
                  Search: "{searchTerm}"
                </span>
                <button
                  onClick={() => onSearchChange("")}
                  className="ml-1 hover:text-primary-900 focus:outline-none focus:ring-1 focus:ring-primary-500 rounded"
                  aria-label="Clear search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {categoryFilter && (
              <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                <span className="truncate max-w-32 sm:max-w-none">
                  Category: {formatCategoryName(categoryFilter)}
                </span>
                <button
                  onClick={() => onCategoryChange("")}
                  className="ml-1 hover:text-primary-900 focus:outline-none focus:ring-1 focus:ring-primary-500 rounded"
                  aria-label="Clear category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
