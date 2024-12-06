import { useMemo } from 'react';
import * as d3 from 'd3';
import { useMaxValue, useScaleLinear, useScalePoint } from '../../lib/hooks';
import { useChart } from '../Provider';

export interface UseAreaArguments {
  values: number[];
  labels: string[];
  curve?: d3.CurveFactory;
}

export const useArea = ({
  values,
  labels,
  curve = d3.curveMonotoneX,
}: UseAreaArguments) => {
  const xScale = useScalePoint(labels);
  const yScale = useScaleLinear(values);
  const { height } = useChart();

  const d = useMemo(() => {
    const build = d3
      .area<string>()
      .x((d) => xScale(d) ?? 0)
      .y0(height)
      .y1((_, i) => yScale(values[i]))
      .curve(curve);

    return build(labels) ?? '';
  }, [values, labels, xScale, yScale, curve, height]);

  useMaxValue(values);

  return { d };
};
