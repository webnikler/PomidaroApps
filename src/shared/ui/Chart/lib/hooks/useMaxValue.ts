import { useLayoutEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChart } from '../../components/Provider';

export const useMaxValue = (values: number[]) => {
  const { setMaxValue, removeMaxValue } = useChart();

  useLayoutEffect(() => {
    const key = uuidv4();
    const maxValue = Math.max(...values) ?? 0;

    setMaxValue(key, maxValue);

    return () => removeMaxValue(key);
  }, [values, setMaxValue, removeMaxValue]);
};
