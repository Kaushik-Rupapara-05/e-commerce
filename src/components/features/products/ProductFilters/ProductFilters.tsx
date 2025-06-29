import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input, Button } from "../../../common";

type ProductFiltersProps = {
  searchTerm?: string;
  onSearchChange: (value: string) => void;
  categoryFilter?: string;
  onCategoryChange: (value: string) => void;
  categories?: string[];
  onClearFilters: () => void;
  className?: string;
};

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm = "",
  onSearchChange,
  categoryFilter = "",
  onCategoryChange,
  categories = [],
  onClearFilters,
  className = "",
}) => {
  const hasActiveFilters = searchTerm || categoryFilter;

  interface FormatCategoryName {
    (category: string): string;
  }

  const formatCategoryName: FormatCategoryName = (category) => {
    if (!category || typeof category !== "string") return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border ${className}`}>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-64">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            startIcon={<Search className="w-4 h-4" />}
            className="w-full"
          />
        </div>

        <div className="min-w-48">
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

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="md"
            onClick={onClearFilters}
            startIcon={<X className="w-4 h-4" />}
            endIcon={""}
            className="whitespace-nowrap"
          >
            Clear Filters
          </Button>
        )}

        <div className="md:hidden">
          <Button
            variant="outline"
            size="md"
            startIcon={<Filter className="w-4 h-4" />}
            endIcon={""}
            onClick={() => {}}
          >
            Filters
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>

          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange("")}
                className="ml-1 hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {categoryFilter && (
            <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
              Category: {formatCategoryName(categoryFilter)}
              <button
                onClick={() => onCategoryChange("")}
                className="ml-1 hover:text-primary-900"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
