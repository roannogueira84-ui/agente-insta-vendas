import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={className} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
