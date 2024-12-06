import { ComponentProps, forwardRef } from 'react';
import { useLine, UseLineArguments } from './useLine';
import { twMerge } from 'tailwind-merge';

export interface LineProps
  extends Omit<ComponentProps<'path'>, 'values'>,
    UseLineArguments {}

export const Line = forwardRef<SVGPathElement, LineProps>(
  ({ className, values, labels, curve, ...rest }, ref) => {
    const { d } = useLine({ values, labels, curve });

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

Line.displayName = 'Line';
