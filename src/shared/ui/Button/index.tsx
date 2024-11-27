import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, forwardRef, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Ripple } from '../Ripple';

const buttonVariants = cva(
  [
    'flex',
    'items-center',
    'justify-center',
    'gap-1',
    'shadow-lg',
    'disabled:bg-gray-300',
    'disabled:text-gray-400',
    'disabled:shadow-none',
    'overflow-hidden',
    'relative',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-indigo-800', 'text-white', 'active:bg-indigo-900'],
        secondary: [], // todo
      },
      size: {
        md: ['px-4', 'h-9', 'text-sm'],
        sm: ['px-2', 'h-8', 'text-xs'],
      },
      shape: {
        circle: ['rounded-full'],
        rect: ['rounded'],
      },
    },
    compoundVariants: [
      {
        shape: 'circle',
        class: 'p-0',
      },
      {
        shape: 'circle',
        size: 'md',
        class: 'size-10',
      },
      {
        shape: 'circle',
        size: 'sm',
        class: 'size-8',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'rect',
    },
  },
);

interface Props
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export type ButtonProps = PropsWithChildren<Props>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled, loading, children, variant, size, shape, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(buttonVariants({ variant, size, shape }))}
        disabled={disabled || loading}
        {...rest}
      >
        <Ripple fromCenter={shape === 'circle'} />
        {children}
      </button>
    );
  },
);

export default Button;
