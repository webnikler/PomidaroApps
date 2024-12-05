import { ComponentProps, forwardRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { LineChartDataItem, LineChartProps } from '../../lib/types';
import { DEFAULT_ANIMATION_TIME, DEFAULT_CURVE } from '../../lib/constants';
import { twMerge } from 'tailwind-merge';
import { useLineScale } from '../../lib/hooks';

export interface LineProps extends LineChartProps, ComponentProps<'path'> {}

const useLine = ({ data, curve = DEFAULT_CURVE }: LineChartProps) => {
  const { xScale, yScale } = useLineScale(data);

  return useMemo(
    () =>
      d3
        .line<LineChartDataItem>()
        .x((d) => xScale(d.label) as number)
        .y((d) => yScale(d.value))
        .curve(curve)(data) as string,
    [data, xScale, yScale, curve],
  );
};

export const Line = forwardRef<SVGPathElement, LineProps>(
  ({ className, data, style, curve, ...rest }, ref) => {
    const d = useLine({ data, curve });

    return (
      <path
        ref={ref}
        d={d}
        className={twMerge('fill-none stroke-2', className)}
        style={{ transition: `d ${DEFAULT_ANIMATION_TIME}`, ...style }}
        {...rest}
      />
    );
  },
);
