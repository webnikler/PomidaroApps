import { ComponentProps, forwardRef } from 'react';
import { LineChartProps } from '../../lib/types';
import { useLine } from './useLine';
import { twMerge } from 'tailwind-merge';

export interface LineProps extends LineChartProps, ComponentProps<'path'> {}

export const Line = forwardRef<SVGPathElement, LineProps>(
  ({ className, data, curve, ...rest }, ref) => {
    const d = useLine({ data, curve });

    return (
      <path
        ref={ref}
        d={d}
        className={twMerge(
          'transition-d fill-none stroke-2 duration-500',
          className,
        )}
        {...rest}
      />
    );
  },
);
