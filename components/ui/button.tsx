import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "destructive";
}

const variants = {
  default: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
  destructive: "bg-red-600 text-white hover:bg-red-700"
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export default Button;

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
