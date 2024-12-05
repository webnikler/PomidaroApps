import { useMemo } from 'react';
import { useMap } from 'usehooks-ts';

export const useMaxValueStore = () => {
  const [store, { set, remove }] = useMap<string, number>([]);
  const maxValue = useMemo(() => Math.max(...store.values(), 0), [store]);

  return { setMaxValue: set, removeMaxValue: remove, maxValue };
};
