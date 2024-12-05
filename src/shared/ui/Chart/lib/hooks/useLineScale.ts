import { useLayoutEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import type { LineChartData } from '../types';
import { LINE_CHART_MARGIN_TOP_PERCENT } from '../constants';
import { useChart } from '../../components/Provider';

export interface UseLineScaleOptions {
  width: number;
  height: number;
}

export interface UseLineScaleData {
  xScale: d3.ScalePoint<string>;
  yScale: d3.ScaleLinear<number, number>;
}

export const useLineScale = (data: LineChartData) => {
  const { width, height, maxValue, setMaxValue, removeMaxValue } = useChart();

  const xScale = useMemo<UseLineScaleData['xScale']>(
    () =>
      d3
        .scalePoint()
        .domain(data.map((d) => d.label))
        .range([0, width]),
    [data, width],
  );

  const yScale = useMemo<UseLineScaleData['yScale']>(
    () =>
      d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([height, (height * LINE_CHART_MARGIN_TOP_PERCENT) / 100]),
    [maxValue, height],
  );

  useLayoutEffect(() => {
    const key = uuidv4();
    const value = d3.max(data, (d) => d.value) as number;

    setMaxValue(key, value);

    return () => removeMaxValue(key);
  }, [data, setMaxValue, removeMaxValue]);

  return {
    xScale,
    yScale,
  };
};
