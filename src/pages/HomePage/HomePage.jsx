import React from "react";
import { Carousel, FeatureSection } from "../../components/features/home";
import { ShoppingCart, User, Plus } from "lucide-react";
import { Button } from "../../components/common";
import { useAuth } from "../../context/AuthContext";

const HomePage = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();

  // Coffee shop carousel images (using the provided images concept)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        {/* Hero Carousel Section */}
        <div className="mb-16">
          <Carousel
            images={carouselImages}
            autoPlay={true}
            interval={5000}
            showDots={true}
            showArrows={true}
            className="mb-8"
          />

          {/* Welcome Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-6">
              Welcome to Our Coffee Shop
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the perfect blend of tradition, innovation, and passion
              in every cup. From bean to brew, we're committed to delivering
              excellence.
            </p>

            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate("signup")}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
                >
                  Join Our Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate("login")}
                >
                  Sign In
                </Button>
              </div>
            )}

            {isAuthenticated && (
              <Button
                size="lg"
                onClick={() => onNavigate("products")}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
              >
                Explore Our Products
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 font-display">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Section Component */}
        <FeatureSection />

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-display mb-4">
              Trusted by Coffee Lovers Worldwide
            </h2>
            <p className="text-primary-100 text-lg">
              Join thousands of satisfied customers who choose us for their
              daily coffee needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Coffee Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-coffee-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">
            Ready to Start Your Coffee Journey?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Experience the difference that quality, expertise, and passion make
            in every cup. Join our community today and discover your perfect
            brew.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate("signup")}>
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate("login")}
              >
                Already a Member?
              </Button>
            </div>
          ) : (
            <Button size="lg" onClick={() => onNavigate("products")}>
              Browse Our Collection
            </Button>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Free Shipping Over $50
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              30-Day Money Back Guarantee
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              24/7 Customer Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
