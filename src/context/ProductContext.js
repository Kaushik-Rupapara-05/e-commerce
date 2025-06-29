import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { productService } from "../services";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
          case "title":
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case "price":
            aValue = parseFloat(a.price);
            bValue = parseFloat(b.price);
            break;
          case "rating":
            aValue = a.rating?.rate || 0;
            bValue = b.rating?.rate || 0;
            break;
          case "category":
            aValue = a.category.toLowerCase();
            bValue = b.category.toLowerCase();
            break;
          default:
            return 0;
        }

        if (sortOrder === "desc") {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        } else {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const searchProducts = (term) => {
    setSearchTerm(term);
  };

  const filterByCategory = (category) => {
    setCategoryFilter(category);
  };

  const sortProducts = (field, order = "asc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSortBy("");
    setSortOrder("asc");
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id));
  };

  const updateProduct = async (id, productData) => {
    try {
      const updatedProduct = await productService.updateProduct(
        id,
        productData
      );
      console.log("Product updated successfully:", updatedProduct);

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...productData } : product
        )
      );

      return { success: true, data: updatedProduct };
    } catch (error) {
      console.error("Failed to update product:", error);
      return { success: false, error: error.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await productService.deleteProduct(id);
      console.log("Product deleted successfully:", result);

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to delete product:", error);
      return { success: false, error: error.message };
    }
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      console.log("Product created successfully:", newProduct);

      // Update local state
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      return { success: true, data: newProduct };
    } catch (error) {
      console.error("Failed to create product:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    products,
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
    getProductById,
    fetchProducts,
    updateProduct,
    deleteProduct,
    createProduct,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    hasProducts: products.length > 0,
    hasFilteredProducts: filteredProducts.length > 0,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
