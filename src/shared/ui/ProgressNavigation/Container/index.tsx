import {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { HorizontalScroller } from '../../HorizontalScroller';
import { ProgressNavigationContext } from '../Context';

interface Props {
  activeId: number;
  onChange?: (activeId: number) => void;
}

export type ProgressNavigationContainerProps = PropsWithChildren<Props>;

export const ProgressNavigationContainer = ({
  activeId: forcedActiveId,
  onChange = () => {},
  children,
}: ProgressNavigationContainerProps) => {
  const [activeId, setActiveId] = useState(forcedActiveId);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => setActiveId(forcedActiveId), [forcedActiveId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      onChange(activeId);
    }
  }, [activeId, onChange]);

  return (
    <HorizontalScroller scrollSnap>
      <ProgressNavigationContext.Provider value={{ activeId, setActiveId }}>
        {children}
      </ProgressNavigationContext.Provider>
    </HorizontalScroller>
  );
};
