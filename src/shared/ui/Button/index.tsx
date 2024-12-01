import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, forwardRef, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Ripple } from '../Ripple';

// @todo - replace with tailwind-variants
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
    'shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-indigo-800', 'text-white', 'active:bg-indigo-900'],
        secondary: [], // todo
        inherit: ['bg-transparent', 'shadow-none', 'disabled:bg-transparent'],
      },
      size: {
        md: ['px-4', 'h-9', 'text-sm'],
        sm: ['px-2', 'h-8', 'text-xs'],
      },
      shape: {
        circle: ['rounded-full'],
        rect: ['rounded'],
      },
      fullwidth: {
        true: ['w-full', 'shrink'],
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
  ripple?: boolean;
}

export type ButtonProps = PropsWithChildren<Props>;

const RIPPLE_COLOR_DARK = 'rgba(0,0,0,.5)';
const RIPPLE_COLOR_LIGHT = 'rgba(255,255,255,.5)';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      ripple = true,
      disabled,
      loading,
      children,
      variant,
      size,
      shape,
      fullwidth,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          buttonVariants({ variant, size, shape, fullwidth }),
          className,
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {ripple && (
          <Ripple
            color={
              variant === 'inherit' ? RIPPLE_COLOR_DARK : RIPPLE_COLOR_LIGHT
            }
            fromCenter={shape === 'circle'}
          />
        )}
        {children}
      </button>
    );
  },
);

export default Button;
