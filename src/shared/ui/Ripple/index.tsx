import { memo, MouseEvent, useLayoutEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface RippleItem {
  x: number;
  y: number;
  size: number;
}

interface RippleProps {
  duration?: number;
  color?: string;
  fromCenter?: boolean;
}

export const Ripple = memo(
  ({
    duration = 1000,
    color = 'rgba(255,255,255, .5)',
    fromCenter = false,
  }: RippleProps) => {
    const [ripples, setRipples] = useState<RippleItem[]>([]);

    useLayoutEffect(() => {
      let timeout: ReturnType<typeof setTimeout>;

      if (ripples.length > 0) {
        timeout = setTimeout(
          () => [setRipples([]), clearTimeout(timeout)],
          duration * 4,
        );
      }

      return () => clearTimeout(timeout);
    }, [ripples, duration]);

    const addRipple = ({ clientX, clientY, currentTarget }: MouseEvent) => {
      const { width, height, x, y } = currentTarget.getBoundingClientRect();
      const size = width > height ? width : height;
      const half = size / 2;
      const rippleX = fromCenter ? width / 2 - half : clientX - x - half;
      const rippleY = fromCenter ? height / 2 - half : clientY - y - half;

      setRipples([...ripples, { x: rippleX, y: rippleY, size }]);
    };

    return (
      <div className='absolute inset-0' onMouseDown={addRipple}>
        {ripples.map(({ x, y, size }, key) => (
          <span
            key={key}
            className={twMerge('animate-ripple absolute rounded-full')}
            style={{
              top: y,
              left: x,
              width: size,
              height: size,
              animationDuration: `${duration}ms`,
              transform: 'scale(0)',
              background: color,
            }}
          />
        ))}
      </div>
    );
  },
);
