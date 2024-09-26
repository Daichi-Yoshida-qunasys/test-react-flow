import { tv } from 'tailwind-variants';

const cardStyles = tv({
  slots: {
    header: 'flex items-center justify-between',
    text: 'text-base font-bold leading-none text-gray-800',
  },
});

type Props = {
  title: string;
  headerRight?: React.ReactNode;
};

export function CardHeader({ title, headerRight }: Props) {
  const { header, text } = cardStyles();
  return (
    <div className={header()}>
      <div className={text()}>{title}</div>
      {headerRight}
    </div>
  );
}
