import * as d3 from 'd3';
import { type ComponentProps, forwardRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type {
  LineChartProps,
  LineChartDataItem,
  LineChartGradient,
} from '../../lib/types';
import { DEFAULT_ANIMATION_TIME, DEFAULT_CURVE } from '../../lib/constants';
import { useChart } from '../../lib/context';
import { useLineScale } from '../../lib/hooks';

export interface AreaProps extends LineChartProps, ComponentProps<'path'> {
  gradient?: LineChartGradient;
}

const useArea = ({ data, curve = DEFAULT_CURVE }: LineChartProps) => {
  const { height } = useChart();
  const { xScale, yScale } = useLineScale(data);

  return useMemo(
    () =>
      d3
        .area<LineChartDataItem>()
        .x((d) => xScale(d.label) as number)
        .y0(height)
        .y1((d) => yScale(d.value))
        .curve(curve)(data) as string,
    [height, xScale, yScale, data, curve],
  );
};

export const Area = forwardRef<SVGPathElement, AreaProps>(
  ({ className, data, fill, gradient, style, curve, ...rest }, ref) => {
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
          className={twMerge('stroke-none', className)}
          style={{ transition: `d ${DEFAULT_ANIMATION_TIME}`, ...style }}
          {...rest}
        />
      </>
    );
  },
);
