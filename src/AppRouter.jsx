import React, { useState } from "react";
import { Navbar, Footer } from "./components/layout";
import { HomePage, LoginPage, SignUpPage, ProductsPage } from "./pages";

const AppRouter = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />;
      case "signup":
        return <SignUpPage onNavigate={setCurrentPage} />;
      case "products":
        return <ProductsPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default AppRouter;
