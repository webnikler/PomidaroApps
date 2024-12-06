import { useMemo } from 'react';
import * as d3 from 'd3';
import { useChart } from '../../components/Provider';

interface Options {
  marginLeft?: number;
  marginRight?: number;
}

const defaultOptions = {
  marginLeft: 0,
  marginRight: 0,
} satisfies Options;

export const useScalePoint = (
  values: string[],
  options: Options = defaultOptions,
) => {
  const { width } = useChart();
  const { marginLeft, marginRight } = Object.assign(defaultOptions, options);

  return useMemo(() => {
    const range = [marginLeft, width - marginRight];

    return d3.scalePoint().domain(values).range(range);
  }, [values, width, marginLeft, marginRight]);
};
