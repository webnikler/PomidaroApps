import { ComponentProps, CSSProperties, forwardRef } from 'react';
import { useArea, UseAreaArguments } from './useArea';
import { twMerge } from 'tailwind-merge';

export interface AreaProps
  extends Omit<ComponentProps<'path'>, 'values'>,
    UseAreaArguments {
  gradient?: Record<number, CSSProperties['color']>;
}

export const Area = forwardRef<SVGPathElement, AreaProps>(
  ({ className, values, labels, fill, gradient, curve, ...rest }, ref) => {
    const { d } = useArea({ values, labels, curve });

    return (
      <>
        {gradient && (
          <defs>
            <linearGradient id='gradient' x1={0} y1={0} x2={0} y2='100%'>
              {Object.entries(gradient).map(([offset, color], index) => (
                <stop key={index} offset={`${offset}%`} stopColor={color} />
              ))}
            </linearGradient>
          </defs>
        )}
        <path
          ref={ref}
          d={d}
          fill={gradient ? 'url(#gradient)' : fill}
          className={twMerge(
            'transition-d stroke-none duration-500',
            className,
          )}
          {...rest}
        />
      </>
    );
  },
);

Area.displayName = 'Area';
