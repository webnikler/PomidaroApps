import type * as d3 from 'd3';
import type { CSSProperties } from 'react';

export interface LineChartDataItem {
  label: string;
  value: number;
}

export type LineChartData = LineChartDataItem[];

export interface LineChartProps {
  data: LineChartData;
  curve?: d3.CurveFactory;
}

export type LineChartGradient = Record<number, CSSProperties['color']>;
