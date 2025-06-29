import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      size = "md",
      variant = "default",
      fullWidth = false,
      className = "",
      required = false,
      type = "text",
      placeholder = "",
      value = "",
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "block border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed w-full";

    const variants = {
      default:
        "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm",
      md: "px-3 py-1.5 text-sm sm:px-3 sm:py-2",
      lg: "px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base",
    };

    const inputVariant = error ? "error" : variant;

    const inputClasses = `
    ${baseStyles}
    ${variants[inputVariant] || variants.default}
    ${sizes[size] || sizes.md}
    ${startIcon ? "pl-8 sm:pl-10" : ""}
    ${endIcon ? "pr-8 sm:pr-10" : ""}
    ${className}
  `.trim();

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm sm:text-base">
                {startIcon}
              </span>
            </div>
          )}

          <input
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={inputClasses}
            {...props}
          />

          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center">
              <span className="text-gray-400 text-sm sm:text-base">
                {endIcon}
              </span>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-xs sm:text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
