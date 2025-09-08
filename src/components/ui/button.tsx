import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' };
export function Button({ variant = 'default', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm';
  const variants: Record<string, string> = {
    default: 'bg-black text-white',
    outline: 'border border-gray-300',
    ghost: 'bg-transparent',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
export default Button;
