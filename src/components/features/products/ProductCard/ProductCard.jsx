import React from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Card, Button } from "../../../common";

const ProductCard = ({ product, onView, onAddToCart, className = "" }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderRating = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm text-gray-600">{rating.rate}</span>
        <span className="text-xs text-gray-500">({rating.count})</span>
      </div>
    );
  };

  return (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(product)}
            className="bg-white bg-opacity-90 hover:bg-opacity-100"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          {renderRating(product.rating)}
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(product)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            startIcon={<ShoppingCart className="w-4 h-4" />}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
