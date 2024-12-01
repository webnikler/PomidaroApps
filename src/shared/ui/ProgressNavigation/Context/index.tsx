import { createContext, Dispatch, SetStateAction } from 'react';

export interface ProgressNavigationContextValue {
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
}

export const ProgressNavigationContext =
  createContext<ProgressNavigationContextValue>({
    activeId: 0,
    setActiveId: () => {
      throw Error(
        `Provider for ${ProgressNavigationContext.displayName} not found!`,
      );
    },
  });
