import React from "react";
import { Coffee, Star, ArrowRight } from "lucide-react";
import { Button } from "../../../common";
import { useAuth } from "../../../../context/AuthContext";

const Hero = ({ onNavigate, className = "" }) => {
  const { isAuthenticated } = useAuth();

  return (
    <section
      className={`bg-gradient-to-br from-coffee-50 to-primary-50 ${className}`}
    >
      <div className="container-custom py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">
                Rated #1 Coffee Shop
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-display leading-tight">
                Exceptional Coffee,
                <span className="text-primary-600 block">Crafted Perfect</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience the finest coffee from around the world, roasted to
                perfection and delivered fresh to your doorstep every morning.
              </p>
            </div>

            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Coffee Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isAuthenticated ? (
                <>
                  <Button
                    size="lg"
                    onClick={() => onNavigate?.("signup")}
                    endIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onNavigate?.("login")}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  onClick={() => onNavigate?.("products")}
                  endIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Browse Products
                </Button>
              )}
            </div>

            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-sm text-gray-600">
                  Sustainably Sourced
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=700&fit=crop"
                alt="Premium Coffee"
                className="w-full rounded-2xl shadow-2xl"
              />

              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5</div>
                    <div className="text-xs text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Coffee className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Fresh</div>
                    <div className="text-xs text-gray-600">Roasted Daily</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3 -z-10"></div>
            <div className="absolute inset-0 bg-primary-100 rounded-2xl transform -rotate-2 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
