import { clsx } from "clsx";
import { tv } from "tailwind-variants";
import { CardHeader } from "../CardHeader";

const cardStyles = tv({
  slots: {
    base: "bg-white rounded-xl p-6 flex flex-col gap-4",
  },
});

type Props = {
  title?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  className?: string;
};

export function Card({ className, title, children, headerRight }: Props) {
  const { base } = cardStyles();
  return (
    <div className={clsx(className, base())}>
      {title && <CardHeader title={title} headerRight={headerRight} />}
      {children}
    </div>
  );
}
