import { Area } from '../Area';
import { Line } from '../Line';
import { ChartProvider, useChart } from './Provider';

export { useChart };

export const Chart = Object.assign(ChartProvider, {
  Area,
  Line,
});
