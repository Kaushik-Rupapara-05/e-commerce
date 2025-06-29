import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  className = "",
}) => {
  const sizes = {
    sm: "max-w-sm sm:max-w-md",
    md: "max-w-lg sm:max-w-xl lg:max-w-2xl",
    lg: "max-w-xl sm:max-w-2xl lg:max-w-4xl",
    xl: "max-w-2xl sm:max-w-4xl lg:max-w-6xl",
    full: "max-w-full mx-2 sm:mx-4",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div
          className={`
            relative bg-white rounded-lg sm:rounded-xl shadow-xl w-full transform transition-all
            ${sizes[size]}
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-2">
                  {title}
                </h3>
              )}

              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-96 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg sm:rounded-b-xl">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
