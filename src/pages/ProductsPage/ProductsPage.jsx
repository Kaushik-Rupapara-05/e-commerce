import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import {
  ProductFilters,
  ProductTable,
  ProductModal,
} from "../../components/features/products";
import { Button } from "../../components/common";
import { ShoppingBag, AlertCircle } from "lucide-react";

const ProductsPage = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const {
    filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    categoryFilter,
    sortBy,
    sortOrder,
    searchProducts,
    filterByCategory,
    sortProducts,
    clearFilters,
    updateProduct,
    deleteProduct,
    totalProducts,
    filteredCount,
  } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view the products page.
          </p>
          <div className="space-x-4">
            <Button onClick={() => onNavigate("login")} variant="primary">
              Login
            </Button>
            <Button onClick={() => onNavigate("signup")} variant="outline">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    setShowUpdateForm(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowUpdateForm(true);
    setShowProductModal(true);
  };

  const handleUpdateProduct = async (productData) => {
    if (!selectedProduct) return;

    const result = await updateProduct(selectedProduct.id, productData);

    if (result.success) {
      alert(
        `✅ Product "${
          selectedProduct.title
        }" updated successfully!\n\nUpdated Data:\n${JSON.stringify(
          result.data,
          null,
          2
        )}`
      );
      console.log("Product Update Result:", result.data);
      setShowProductModal(false);
      setSelectedProduct(null);
      setShowUpdateForm(false);
    } else {
      alert(`❌ Failed to update product: ${result.error}`);
      console.error("Update failed:", result.error);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmDelete = window.confirm(
      `⚠️ Are you sure you want to delete this product?\n\n"${product.title}"\n\nThis action cannot be undone.`
    );

    if (confirmDelete) {
      const result = await deleteProduct(product.id);

      if (result.success) {
        alert(
          `✅ Product "${
            product.title
          }" deleted successfully!\n\nDeleted Data:\n${JSON.stringify(
            result.data,
            null,
            2
          )}`
        );
        console.log("Product Delete Result:", result.data);
        setShowProductModal(false);
        setSelectedProduct(null);
      } else {
        alert(`❌ Failed to delete product: ${result.error}`);
        console.error("Delete failed:", result.error);
      }
    }
  };

  const handleSortChange = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    sortProducts(field, newOrder);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setShowUpdateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">
                Product Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and browse all available products with full CRUD
                operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Products</div>
                <div className="text-2xl font-bold text-primary-600">
                  {totalProducts}
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700">Error: {error}</span>
            </div>
          </div>
        )}

        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={searchProducts}
          categoryFilter={categoryFilter}
          onCategoryChange={filterByCategory}
          categories={categories}
          onClearFilters={clearFilters}
          className="mb-6"
        />

        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {searchTerm || categoryFilter ? (
              <>
                Showing {filteredCount} of {totalProducts} products
                {searchTerm && ` matching "${searchTerm}"`}
                {categoryFilter && ` in "${categoryFilter}"`}
              </>
            ) : (
              `Showing all ${totalProducts} products`
            )}
            {sortBy && (
              <span className="ml-2 text-primary-600">
                • Sorted by {sortBy} ({sortOrder})
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Default</option>
              <option value="title">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="category">Category</option>
            </select>
            {sortBy && (
              <button
                onClick={() => handleSortChange(sortBy)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {sortOrder === "asc" ? "↑ ASC" : "↓ DESC"}
              </button>
            )}
          </div>
        </div>

        <ProductTable
          products={filteredProducts}
          onView={handleViewProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          loading={loading}
        />

        <ProductModal
          isOpen={showProductModal}
          onClose={handleCloseModal}
          product={selectedProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onUpdate={handleUpdateProduct}
          showUpdateForm={showUpdateForm}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
