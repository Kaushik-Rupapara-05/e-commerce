import { API_ENDPOINTS } from "../utils/constants";

class ProductService {
  async getAllProducts(limit = null, sort = null) {
    try {
      let url = API_ENDPOINTS.PRODUCTS;
      const params = new URLSearchParams();

      if (limit) params.append("limit", limit);
      if (sort) params.append("sort", sort);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products. Please try again later.");
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Failed to fetch product. Please try again later.");
    }
  }

  async getCategories() {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories. Please try again later.");
    }
  }

  async getProductsByCategory(category) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.PRODUCTS}/category/${category}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw new Error("Failed to fetch products. Please try again later.");
    }
  }

  async createProduct(productData) {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product. Please try again later.");
    }
  }

  async updateProduct(id, productData) {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product. Please try again later.");
    }
  }

  async deleteProduct(id) {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product. Please try again later.");
    }
  }
}

export const productService = new ProductService();
