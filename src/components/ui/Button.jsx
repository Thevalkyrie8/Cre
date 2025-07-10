import React from "react"

const variantClasses = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-blue-600 underline hover:text-blue-800"
}

const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-8 text-lg",
  icon: "h-10 w-10 p-0 flex items-center justify-center"
}

export const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const combinedClassName = `
      inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
      ${variantClasses[variant] || ""} 
      ${sizeClasses[size] || ""} 
      ${className}
    `
    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
