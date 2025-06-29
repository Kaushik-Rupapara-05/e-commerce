import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../common";

const Navbar = ({ currentPage, onNavigate }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const navItems = [
    { key: "home", label: "Home", public: true },
    { key: "products", label: "Products", protected: true },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
              Coffee Shop
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              if (item.protected && !isAuthenticated) return null;
              if (item.public === false && !isAuthenticated) return null;

              return (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.key)}
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

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
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
                  onClick={() => onNavigate("login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate("signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
