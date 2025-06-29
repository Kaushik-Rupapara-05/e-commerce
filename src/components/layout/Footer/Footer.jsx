import React from "react";
import { Coffee, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    console.log(`Navigate to ${section}`);
    // Add your navigation logic here
  };

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Coffee Shop</span>
            </div>
            <p className="text-gray-300 mb-4">
              Bringing you the finest coffee experience with premium beans and
              expert craftsmanship.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-sm">Made with love</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "home")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "products")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "about")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "contact")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "coffee-beans")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Coffee Beans
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "equipment")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "accessories")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, "gift-cards")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">123 Coffee Street, Bean City</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <a
                  href="tel:+15551234567"
                  className="text-sm hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <a
                  href="mailto:hello@coffeeshop.com"
                  className="text-sm hover:text-white transition-colors"
                >
                  hello@coffeeshop.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Coffee Shop. All rights reserved. Built with React & Tailwind
            CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
