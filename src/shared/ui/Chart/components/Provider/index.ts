import { Area } from '../Area';
import { Axis } from '../Axis';
import { Line } from '../Line';
import { ChartProvider, useChart } from './Provider';

export { useChart };

export const Chart = Object.assign(ChartProvider, {
  Area,
  Axis,
  Line,
});

Chart.displayName = 'Chart';
