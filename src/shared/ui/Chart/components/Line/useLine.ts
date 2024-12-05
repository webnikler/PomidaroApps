import { useMemo } from 'react';
import * as d3 from 'd3';
import { DEFAULT_CURVE } from '../../lib/constants';
import { useLineScale } from '../../lib/hooks';
import { LineChartDataItem, LineChartProps } from '../../lib/types';

export const useLine = ({ data, curve = DEFAULT_CURVE }: LineChartProps) => {
  const { xScale, yScale } = useLineScale(data);

  return useMemo(
    () =>
      d3
        .line<LineChartDataItem>()
        .x((d) => xScale(d.label) ?? 0)
        .y((d) => yScale(d.value))
        .curve(curve)(data) ?? '',
    [data, xScale, yScale, curve],
  );
};
