import { ComponentProps, forwardRef } from 'react';
import { LineChartGradient, LineChartProps } from '../../lib/types';
import { useArea } from './useArea';
import { twMerge } from 'tailwind-merge';

export interface AreaProps extends LineChartProps, ComponentProps<'path'> {
  gradient?: LineChartGradient;
}

export const Area = forwardRef<SVGPathElement, AreaProps>(
  ({ className, data, fill, gradient, curve, ...rest }, ref) => {
    const d = useArea({ data, curve });

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
