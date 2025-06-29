import React from "react";
import { Carousel, FeatureSection } from "../../components/features/home";
import { ShoppingCart, User, Plus } from "lucide-react";
import { Button } from "../../components/common";
import { useAuth } from "../../context/AuthContext";

const HomePage = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();

  // Coffee shop carousel images
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=600&fit=crop&q=80",
      title: "Premium Coffee Experience",
      subtitle: "Discover our finest coffee blends from around the world",
    },
    {
      url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=600&fit=crop&q=80",
      title: "Artisan Roasted",
      subtitle: "Carefully crafted by our expert roasters every morning",
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=600&fit=crop&q=80",
      title: "Coffee Culture",
      subtitle: "Join our community of passionate coffee enthusiasts",
    },
    {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=600&fit=crop&q=80",
      title: "Fresh Daily",
      subtitle: "Roasted fresh every morning for optimal flavor and aroma",
    },
    {
      url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=600&fit=crop&q=80",
      title: "Award Winning Quality",
      subtitle: "Recognized worldwide for excellence in coffee roasting",
    },
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: "Premium Quality",
      description:
        "Sourced from the finest coffee farms worldwide with sustainable practices",
    },
    {
      icon: User,
      title: "Expert Roasters",
      description:
        "Crafted by experienced coffee artisans with decades of expertise",
    },
    {
      icon: Plus,
      title: "Fresh Daily",
      description:
        "Roasted fresh every morning for optimal flavor and delivered at peak freshness",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "50+", label: "Coffee Varieties" },
    { value: "15+", label: "Years Experience" },
    { value: "4.9", label: "Average Rating" },
  ];

  const trustIndicators = [
    { color: "bg-green-500", text: "Free Shipping Over $50" },
    { color: "bg-blue-500", text: "30-Day Money Back Guarantee" },
    { color: "bg-purple-500", text: "24/7 Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-4 sm:py-6 lg:py-8">
        {/* Hero Carousel Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <Carousel
            images={carouselImages}
            autoPlay={true}
            interval={5000}
            showDots={true}
            showArrows={true}
            className="mb-6 sm:mb-8"
          />

          {/* Welcome Section */}
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-display mb-4 sm:mb-6">
              Welcome to Our Coffee Shop
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of tradition, innovation, and passion
              in every cup. From bean to brew, we're committed to delivering
              excellence.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
                <Button
                  size="lg"
                  onClick={() => onNavigate("signup")}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 w-full sm:w-auto"
                >
                  Join Our Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate("login")}
                  className="w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </div>
            )}

            {isAuthenticated && (
              <Button
                size="lg"
                onClick={() => onNavigate("products")}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 w-full sm:w-auto"
              >
                Explore Our Products
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16 px-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-display">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Section Component */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <FeatureSection />
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg sm:rounded-xl lg:rounded-2xl p-6 sm:p-8 lg:p-12 text-white mb-8 sm:mb-12 lg:mb-16 mx-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-display mb-3 sm:mb-4">
              Trusted by Coffee Lovers Worldwide
            </h2>
            <p className="text-primary-100 text-base sm:text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who choose us for their
              daily coffee needs
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-2">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100 text-xs sm:text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-coffee-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-6 sm:p-8 text-center mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 font-display">
            Ready to Start Your Coffee Journey?
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the difference that quality, expertise, and passion make
            in every cup. Join our community today and discover your perfect
            brew.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none mb-6 sm:mb-8">
              <Button
                size="lg"
                onClick={() => onNavigate("signup")}
                className="w-full sm:w-auto"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate("login")}
                className="w-full sm:w-auto"
              >
                Already a Member?
              </Button>
            </div>
          ) : (
            <div className="mb-6 sm:mb-8">
              <Button
                size="lg"
                onClick={() => onNavigate("products")}
                className="w-full sm:w-auto"
              >
                Browse Our Collection
              </Button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="flex items-center justify-center sm:justify-start"
              >
                <div
                  className={`w-2 h-2 ${indicator.color} rounded-full mr-2 flex-shrink-0`}
                ></div>
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
