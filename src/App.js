import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import AppRouter from "./AppRouter";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRouter />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
