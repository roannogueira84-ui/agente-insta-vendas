import * as React from 'react';
type Props = React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'secondary' };
export function Badge({ variant = 'default', className = '', ...props }: Props) {
  const base = 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium';
  const variants: Record<string, string> = {
    default: 'bg-gray-900 text-white',
    secondary: 'bg-gray-200 text-gray-900',
  };
  return <span className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
export default Badge;
