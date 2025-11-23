import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import './Card.css';

const Card = forwardRef(({ className, children, hover3d = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl bg-card text-card-foreground shadow-lg',
      'border border-white/5 backdrop-blur-sm',
      'transition-all duration-300',
      hover3d && 'hover-3d-card',
      !hover3d && 'hover:shadow-xl hover:border-white/10',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = 'Card';

export { Card };
