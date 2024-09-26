import { useSortable } from '@dnd-kit/sortable';
import { Disabled } from '@dnd-kit/sortable/dist/types';
import { CSS } from '@dnd-kit/utilities';
import { ColumnItem, Props as ColumnItemProps } from '../ColumnItem';

type Props = {
  disabled?: boolean | Disabled;
} & ColumnItemProps;

export const DraggableItem = ({
  itemId,
  className,
  disabled,
  ...other
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: itemId,
      disabled,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <ColumnItem
      itemId={itemId}
      className={className}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      {...other}
    />
  );
};
