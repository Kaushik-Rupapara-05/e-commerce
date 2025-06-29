import React from "react";

const Card = ({
  children,
  className = "",
  padding = "p-4 sm:p-6",
  shadow = "shadow-md",
  rounded = "rounded-lg",
  hover = false,
  onClick,
  ...props
}) => {
  const baseClasses = `bg-white ${shadow} ${rounded} ${padding}`;
  const hoverClasses = hover
    ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
