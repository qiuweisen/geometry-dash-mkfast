import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Theme-aware Geometry Dash wordmark shared by the site shell. */
export function Logo({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/logo.svg"
      alt={props.alt ?? 'Play Geometry Dash'}
      {...props}
      className={cn('h-8 w-auto shrink-0', className)}
    />
  );
}
