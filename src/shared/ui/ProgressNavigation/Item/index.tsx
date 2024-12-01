import {
  ComponentProps,
  forwardRef,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { IconClose700, IconDone700 } from '../../Icon';
import { CircularProgress } from '../../CircularProgress';
import { twMerge } from 'tailwind-merge';
import { Ripple } from '../../Ripple';
import { tv } from 'tailwind-variants';
import { ProgressNavigationContext } from '../Context';

export interface ProgressNavigationItemProps extends ComponentProps<'button'> {
  itemId: number;
  completedIcon?: ReactNode;
  uncompletedIcon?: ReactNode;
  title?: string;
  subtitle?: string;
  line?: boolean;
  progress?: number;
  onlyIcon?: boolean;
}

const progressNavigationVariants = tv({
  slots: {
    circularProgress: 'text-xs',
    backLine: 'transition-[fill] duration-500',
    frontLine: '',
  },
  variants: {
    completed: {
      true: {
        circularProgress: 'text-white',
        backLine: 'fill-indigo-800',
      },
      false: {
        circularProgress: 'text-red-600',
        backLine: 'fill-white',
        frontLine: 'stroke-red-800',
      },
    },
    disabled: {
      true: {
        circularProgress: 'text-gray-400',
        backLine: 'fill-gray-300',
        frontLine: 'stroke-gray-400',
      },
    },
  },
  compoundVariants: [
    {
      disabled: true,
      completed: true,
      class: {
        circularProgress: 'text-white',
        backLine: 'fill-gray-400',
      },
    },
  ],
});

export const ProgressNavigationItem = forwardRef<
  HTMLButtonElement,
  ProgressNavigationItemProps
>(
  (
    {
      itemId,
      line = true,
      completedIcon = <IconDone700 />,
      uncompletedIcon = <IconClose700 />,
      progress = 0,
      disabled = false,
      onlyIcon = false,
      title,
      subtitle,
      className,
      onClick,
      ...rest
    }: ProgressNavigationItemProps,
    ref,
  ) => {
    const { activeId, setActiveId } = useContext(ProgressNavigationContext);
    const localRef = useRef<HTMLButtonElement>(null);

    const completed = progress >= 100;
    const variants = progressNavigationVariants({ completed, disabled });
    const active = itemId === activeId;
    const showLine = line && !onlyIcon;

    useImperativeHandle(ref, () => localRef.current!);

    useEffect(() => {
      if (active) localRef.current?.scrollIntoView({ inline: 'center' });
    }, [active]);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setActiveId(itemId);
      onClick?.(event);
    };

    return (
      <button
        ref={localRef}
        disabled={disabled}
        className={twMerge(
          'relative flex w-full min-w-20 snap-center flex-col gap-2 overflow-hidden rounded-lg p-2 pr-0 transition-colors duration-500 first:snap-start last:snap-end',
          active && 'bg-gray-200',
          onlyIcon && 'size-10 min-w-10 shrink-0',
          className,
        )}
        onClick={handleClick}
        {...rest}
      >
        <div className='flex w-full items-center gap-2'>
          <CircularProgress
            className={variants.circularProgress()}
            progress={progress}
            backLineClass={variants.backLine()}
            frontLineClass={variants.frontLine()}
          >
            {completed ? completedIcon : uncompletedIcon}
          </CircularProgress>
          {showLine && <div className='h-0.5 w-full rounded-sm bg-gray-300' />}
        </div>
        <div className='flex max-w-full flex-col items-start'>
          <span
            className={twMerge(
              'w-full truncate text-left text-xs font-semibold',
              disabled && 'text-gray-400',
            )}
          >
            {title}
          </span>
          <span className='w-full truncate text-left text-xxs text-gray-400'>
            {subtitle}
          </span>
        </div>
        <Ripple color='rgba(0,0,0,.25)' />
      </button>
    );
  },
);
