import { ComponentProps, forwardRef, useEffect, useState } from 'react';
import { Area } from '../Area';
import { Line } from '../Line';
import { ChartContext } from '../../lib/context';
import { useMap } from 'usehooks-ts';

export interface ChartContainerProps extends ComponentProps<'svg'> {
  width: number;
  height: number;
}

const useMaxValueStore = () => {
  const [store, { set, remove }] = useMap<string, number>([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    setMaxValue(Math.max(...store.values()));
  }, [store]);

  return { setMaxValue: set, removeMaxValue: remove, maxValue };
};

const ChartContainer = forwardRef<SVGSVGElement, ChartContainerProps>(
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

export const Chart = Object.assign(ChartContainer, {
  Area,
  Line,
});
