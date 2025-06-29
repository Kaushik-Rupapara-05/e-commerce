import React, { useState, useEffect } from "react";
import { Star, Tag, Package, Heart, Share2, Edit, Save, X } from "lucide-react";
import { Modal, Button, Input } from "../../../common";

const ProductModal = ({
  isOpen,
  onClose,
  product,
  onEdit,
  onDelete,
  onUpdate,
  showUpdateForm = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
    setIsEditing(showUpdateForm);
  }, [product, showUpdateForm]);

  if (!product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderRating = (rating) => {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current opacity-50"
          />
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600">
          {rating.rate} out of 5 ({rating.count} reviews)
        </span>
      </div>
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (onEdit) {
      onEdit(product);
    }
  };

  const modalFooter = (
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          startIcon={<Heart className="w-4 h-4" />}
        >
          Add to Wishlist
        </Button>
        <Button
          variant="outline"
          size="sm"
          startIcon={<Share2 className="w-4 h-4" />}
        >
          Share
        </Button>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              startIcon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleUpdate}
              startIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={handleEditToggle}
              startIcon={<Edit className="w-4 h-4" />}
            >
              Edit Product
            </Button>
            <Button variant="danger" onClick={() => onDelete?.(product)}>
              Delete Product
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Product" : "Product Details"}
      size="lg"
      footer={modalFooter}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          {isEditing ? (
            <Input
              name="image"
              label="Product Image URL"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="Enter image URL"
              fullWidth
            />
          ) : (
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-64 object-contain rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          )}
        </div>

        <div className="space-y-4">
          <div>
            {isEditing ? (
              <>
                <Input
                  name="title"
                  label="Product Title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Enter product title"
                  fullWidth
                  className="mb-4"
                />
                <Input
                  name="price"
                  label="Price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleFormChange}
                  placeholder="Enter price"
                  fullWidth
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      ID: {product.id}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {product.rating && !isEditing && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Customer Rating
              </h4>
              {renderRating(product.rating)}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
            {isEditing ? (
              <Input
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                placeholder="Enter category"
                fullWidth
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {product.category}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Description
            </h4>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Enter product description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows="4"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Product Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Product ID:</span>
                  <span className="ml-2 text-gray-900">{product.id}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900 capitalize">
                    {product.category}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Price:</span>
                  <span className="ml-2 text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
                {product.rating && (
                  <div>
                    <span className="font-medium text-gray-500">Rating:</span>
                    <span className="ml-2 text-gray-900">
                      {product.rating.rate}/5 ({product.rating.count} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
