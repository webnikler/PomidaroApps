import { CSSProperties, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  backLineColor?: CSSProperties['color'];
  frontLineColor?: CSSProperties['color'];
  innerBackground?: CSSProperties['color'];
  backLineClass?: string;
  frontLineClass?: string;
}

export type CircularProgressProps = PropsWithChildren<Props>;

export const CircularProgress = ({
  size = 24,
  strokeWidth = 2.5,
  innerBackground = 'none',
  progress = 0,
  backLineClass = 'stroke-gray-200',
  frontLineClass = 'stroke-purple-800',
  backLineColor,
  frontLineColor,
  children,
}: CircularProgressProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const limitedProgress = progress > 100 ? 100 : progress < 0 ? 0 : progress;
  const offset = ((100 - limitedProgress) / 100) * circumference;

  return (
    <div className='relative'>
      <svg className='block' width={size} height={size}>
        <circle
          fill={innerBackground}
          className={backLineClass}
          style={{ stroke: backLineColor }}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={twMerge(
            'origin-center -rotate-90 fill-none transition-[stroke-dashoffset] duration-700 ease-in-out',
            frontLineClass,
          )}
          style={{ stroke: frontLineColor }}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className='absolute left-0 top-0 flex size-full items-center justify-center'
        style={{ padding: strokeWidth }}
      >
        {children}
      </div>
    </div>
  );
};
