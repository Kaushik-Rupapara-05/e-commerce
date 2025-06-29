import React from "react";
import { ShoppingCart, User, Plus, Coffee, Award, Clock } from "lucide-react";
import { Card } from "../../../common";

const FeatureSection = ({ className = "" }) => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Premium Quality",
      description:
        "Sourced from the finest coffee farms worldwide, ensuring exceptional taste and aroma in every cup.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: User,
      title: "Expert Roasters",
      description:
        "Our experienced coffee artisans carefully craft each blend using traditional and modern techniques.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Plus,
      title: "Fresh Daily",
      description:
        "Roasted fresh every morning for optimal flavor, delivered to you at peak freshness.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Coffee,
      title: "Variety of Blends",
      description:
        "From light breakfast blends to dark espresso roasts, we have something for every coffee lover.",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized by coffee experts worldwide for our commitment to quality and sustainability.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description:
        "Quick and reliable delivery service to ensure you never run out of your favorite coffee.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-4">
            Why Choose Our Coffee?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference that quality, expertise, and passion make
            in every cup
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                hover={true}
              >
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                >
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-display">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-display">
              Ready to Experience Premium Coffee?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who trust us for their daily
              coffee needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-primary-100">
                <Award className="w-5 h-5" />
                <span className="text-sm">Award Winning Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-100">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-100">
                <Coffee className="w-5 h-5" />
                <span className="text-sm">Fresh Roasted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
