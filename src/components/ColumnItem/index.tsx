import clsx from 'clsx';
import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const columnItemStyles = tv({
  slots: {
    base: 'max-w-[428px] min-w-[120px] w-[100%] h-10 p-2 rounded flex gap-1 items-center justify-center cursor-default',
    left: 'flex items-center justify-center w-6',
    center:
      'text-sm text-black overflow-hidden text-ellipsis whitespace-nowrap grow cursor-pointer text-left bg-transparent',
    right: 'flex items-center justify-center w-6',
  },
  variants: {
    isSelected: {
      true: '',
    },
    color: {
      primary: {
        base: 'bg-white border border-gray-200',
      },
      secondary: {
        base: 'bg-zeon-secondary/10',
      },
      danger: {
        base: 'bg-zeon-red/10',
      },
      success: {
        base: 'bg-zeon-green/10',
      },
      warning: {
        base: 'bg-zeon-yellow/10',
      },
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      color: 'primary',
      class: {
        base: 'border border-gray-700',
      },
    },
    {
      isSelected: true,
      color: 'secondary',
      class: {
        base: 'border border-zeon-primary',
      },
    },
    {
      isSelected: true,
      color: 'danger',
      class: {
        base: 'border border-zeon-red',
      },
    },
    {
      isSelected: true,
      color: 'success',
      class: {
        base: 'border border-zeon-green',
      },
    },
    {
      isSelected: true,
      color: 'warning',
      class: {
        base: 'border border-zeon-yellow',
      },
    },
  ],
});

export type Props = {
  itemId?: number;
  text: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const ColumnItem = forwardRef<HTMLDivElement, Props>(function Item(
  {
    itemId,
    text,
    className,
    left,
    right,
    color = 'primary',
    isSelected = false,
    onClick,
    ...other
  },
  ref
) {
  const {
    base,
    left: leftStyle,
    center,
    right: rightStyle,
  } = columnItemStyles({ color, isSelected });

  return (
    <div
      ref={ref}
      id={itemId?.toString()}
      className={clsx(base(), className)}
      {...other}
    >
      <div className={leftStyle()}>{left}</div>
      <button onClick={onClick} className={center()}>
        {text}
      </button>
      <div className={rightStyle()}>{right}</div>
    </div>
  );
});
