import {
  PropsWithChildren,
  UIEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Button from '../Button';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import { twMerge } from 'tailwind-merge';
import { useDebounceCallback, useResizeObserver } from 'usehooks-ts';

interface Props {
  controls?: boolean;
  scrollbar?: boolean;
  scrollSnap?: boolean;
}

export type HorizontalScrollerProps = PropsWithChildren<Props>;

type ScrollState = 'start' | 'end' | 'progress';

export const HorizontalScroller = ({
  controls = true,
  scrollbar = false,
  scrollSnap = false,
  children,
}: HorizontalScrollerProps) => {
  const [scrollState, setScrollState] = useState<ScrollState>('start');
  const [controlsVisible, setControlsVisible] = useState(false);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const showControls = controls && controlsVisible;

  const handleScroll = ({ currentTarget }: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = currentTarget;

    if (scrollLeft >= scrollWidth - clientWidth) {
      setScrollState('end');
    } else if (scrollLeft <= 0) {
      setScrollState('start');
    } else {
      setScrollState('progress');
    }
  };

  const handleResize = useDebounceCallback(() => {
    if (!scrollContentRef.current) return;

    const { scrollWidth, clientWidth } = scrollContentRef.current;
    setControlsVisible(Boolean(scrollWidth - clientWidth));
  }, 50);

  const scrollTo = (direction: 'left' | 'right') => () => {
    if (!scrollContentRef.current) return;

    const { scrollLeft, clientWidth } = scrollContentRef.current;
    const left =
      direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

    scrollContentRef.current.scrollTo({
      left,
      behavior: 'smooth',
    });
  };

  useLayoutEffect(() => {
    if (!scrollContentRef.current) return;

    const { scrollWidth, clientWidth } = scrollContentRef.current;
    setControlsVisible(Boolean(scrollWidth - clientWidth));
  }, []);

  useResizeObserver({ ref: scrollContentRef, onResize: handleResize });

  return (
    <div className='flex w-full items-center'>
      {showControls && (
        <Button
          size='sm'
          shape='circle'
          variant='inherit'
          disabled={scrollState === 'start'}
          onClick={scrollTo('left')}
          className='mr-1 text-lg'
        >
          <IconChevronLeft />
        </Button>
      )}
      <div
        ref={scrollContentRef}
        onScroll={handleScroll}
        className={twMerge(
          'flex w-full overflow-x-auto scroll-smooth',
          !scrollbar && 'hide-scrollbar',
          scrollSnap && 'snap-x',
        )}
      >
        {children}
      </div>
      {showControls && (
        <Button
          size='sm'
          shape='circle'
          variant='inherit'
          disabled={scrollState === 'end'}
          onClick={scrollTo('right')}
          className='ml-1 text-lg'
        >
          <IconChevronRight />
        </Button>
      )}
    </div>
  );
};
