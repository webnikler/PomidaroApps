import { useMemo } from 'react';
import { useMap } from 'usehooks-ts';

export const useMaxValueStore = () => {
  const [store, { set, remove }] = useMap<string, number>([]);
  const maxValue = useMemo(() => Math.max(0, ...store.values()), [store]);

  return { setMaxValue: set, removeMaxValue: remove, maxValue };
};
