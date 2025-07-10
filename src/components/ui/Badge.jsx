import React from "react";

const badgeStyles = {
  default:
    "inline-flex items-center rounded-full bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5",
  secondary:
    "inline-flex items-center rounded-full bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5",
  destructive:
    "inline-flex items-center rounded-full bg-red-600 text-white text-xs font-semibold px-2.5 py-0.5",
  outline:
    "inline-flex items-center rounded-full border border-gray-300 text-xs font-semibold px-2.5 py-0.5",
};

const Badge = ({ variant = "default", className = "", children }) => {
  const baseClass = badgeStyles[variant] || badgeStyles.default;
  return <div className={`${baseClass} ${className}`}>{children}</div>;
};

export default Badge;
