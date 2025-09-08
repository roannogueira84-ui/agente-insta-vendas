// src/components/ui/label.tsx
import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor?: string;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return <label ref={ref} className={className} {...props} />;
  }
);

Label.displayName = "Label";

export default Label;
