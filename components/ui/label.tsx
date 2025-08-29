import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-gray-700",
        className
      )}
      {...props}
    />
  );
}

export default Label;

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
