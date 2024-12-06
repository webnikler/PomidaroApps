import { useMemo } from 'react';
import * as d3 from 'd3';
import { useChart } from '../../components/Provider';

interface Options {
  marginTop?: number;
  marginBottom?: number;
}

const defaultOptions = {
  marginTop: 0,
  marginBottom: 0,
} satisfies Options;

export const useScaleLinear = (
  values: number[],
  options: Options = defaultOptions,
) => {
  const { height, maxValue: globalMaxValue } = useChart();
  const { marginTop, marginBottom } = Object.assign(defaultOptions, options);

  return useMemo(() => {
    const maxValue = globalMaxValue || Math.max(...values);
    const range = [height - marginBottom, marginTop];
    const domain = [0, maxValue];

    return d3.scaleLinear().domain(domain).range(range);
  }, [height, globalMaxValue, values, marginTop, marginBottom]);
};
