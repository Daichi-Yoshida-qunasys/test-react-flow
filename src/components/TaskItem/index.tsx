import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { ColumnItem } from '../ColumnItem';

interface ITaskItem {
  title: string;
}

export const TaskItem: FC<ITaskItem> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.title,
    });
  return (
    <ColumnItem
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      text={props.title}
      //   className={styles['list-item']}
    ></ColumnItem>
  );
};
