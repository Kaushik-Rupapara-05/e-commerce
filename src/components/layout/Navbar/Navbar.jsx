import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common";

const Navbar = ({ currentPage, onNavigate }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate("home");
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { key: "home", label: "Home", public: true },
    { key: "products", label: "Products", protected: true },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigate("home")}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm sm:text-lg">C</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors hidden sm:block">
              Coffee Shop
            </span>
            <span className="text-base font-bold text-gray-800 group-hover:text-primary-600 transition-colors sm:hidden">
              Coffee
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => {
              if (item.protected && !isAuthenticated) return null;
              if (item.public === false && !isAuthenticated) return null;

              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      currentPage === item.key
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 lg:space-x-4">
                <span className="text-gray-700 text-sm lg:text-base truncate max-w-32 lg:max-w-none">
                  Welcome,{" "}
                  <span className="font-medium">{currentUser?.username}</span>
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  startIcon={<LogOut className="w-4 h-4" />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigate("login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleNavigate("signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => {
              if (item.protected && !isAuthenticated) return null;
              if (item.public === false && !isAuthenticated) return null;

              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigate(item.key)}
                  className={`
                    block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${
                      currentPage === item.key
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile User Actions */}
            <div className="border-t border-gray-200 pt-3">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-3 py-2">
                    <span className="text-gray-700 text-sm">
                      Welcome,{" "}
                      <span className="font-medium">
                        {currentUser?.username}
                      </span>
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    startIcon={<LogOut className="w-4 h-4" />}
                    fullWidth
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigate("login")}
                    fullWidth
                  >
                    Login
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleNavigate("signup")}
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
