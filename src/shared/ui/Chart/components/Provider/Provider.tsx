import { ComponentProps, createContext, forwardRef, useContext } from 'react';
import { useMaxValueStore } from './useMaxValueStore';

export interface ChartProviderProps extends ComponentProps<'svg'> {
  width: number;
  height: number;
}

export interface ChartContextValue {
  width: number;
  height: number;
  maxValue: number;
  setMaxValue: (key: string, value: number) => void;
  removeMaxValue: (key: string) => void;
}

const ChartContext = createContext<ChartContextValue>({
  width: 0,
  height: 0,
  maxValue: 0,
  setMaxValue: () => {},
  removeMaxValue: () => {},
});

export const useChart = () => useContext(ChartContext);

export const ChartProvider = forwardRef<SVGSVGElement, ChartProviderProps>(
  ({ width, height, children, ...rest }, ref) => {
    const { setMaxValue, removeMaxValue, maxValue } = useMaxValueStore();

    return (
      <ChartContext.Provider
        value={{ width, height, maxValue, setMaxValue, removeMaxValue }}
      >
        <svg
          ref={ref}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          {...rest}
        >
          {children}
        </svg>
      </ChartContext.Provider>
    );
  },
);
