import { createContext, useContext } from 'react';

export interface ChartContextValue {
  width: number;
  height: number;
  maxValue: number;
  setMaxValue: (key: string, value: number) => void;
  removeMaxValue: (key: string) => void;
}

export const ChartContext = createContext<ChartContextValue>({
  width: 0,
  height: 0,
  maxValue: 0,
  setMaxValue: () => {},
  removeMaxValue: () => {},
});

export const useChart = () => useContext(ChartContext);
