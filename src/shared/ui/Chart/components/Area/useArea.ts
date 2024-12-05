import { useMemo } from 'react';
import * as d3 from 'd3';
import { DEFAULT_CURVE } from '../../lib/constants';
import { useLineScale } from '../../lib/hooks';
import { LineChartDataItem, LineChartProps } from '../../lib/types';
import { useChart } from '../Provider';

export const useArea = ({ data, curve = DEFAULT_CURVE }: LineChartProps) => {
  const { height } = useChart();
  const { xScale, yScale } = useLineScale(data);

  return useMemo(
    () =>
      d3
        .area<LineChartDataItem>()
        .x((d) => xScale(d.label) ?? 0)
        .y0(height)
        .y1((d) => yScale(d.value))
        .curve(curve)(data) ?? '',
    [height, xScale, yScale, data, curve],
  );
};
