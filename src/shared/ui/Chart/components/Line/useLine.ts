import { useMemo } from 'react';
import * as d3 from 'd3';
import { useMaxValue, useScaleLinear, useScalePoint } from '../../lib/hooks';

export interface UseLineArguments {
  values: number[];
  labels: string[];
  curve?: d3.CurveFactory;
}

export const useLine = ({
  values,
  labels,
  curve = d3.curveMonotoneX,
}: UseLineArguments) => {
  const xScale = useScalePoint(labels);
  const yScale = useScaleLinear(values);

  const d = useMemo(() => {
    const build = d3
      .line<string>()
      .y((_, i) => yScale(values[i]))
      .x((d) => xScale(d) ?? 0)
      .curve(curve);

    return build(labels) ?? '';
  }, [values, labels, xScale, yScale, curve]);

  useMaxValue(values);

  return { d };
};
