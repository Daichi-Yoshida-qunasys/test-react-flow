import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { FC } from 'react';
// import TaskItem from "../task-item/TaskItem";
// import styles from './TaskList.module.css';
import { TaskItem } from '../TaskItem';

interface ITaskList {
  title: string;
  tasks: string[];
}

export const TaskList: FC<ITaskList> = (props) => {
  const { setNodeRef } = useDroppable({ id: props.title });

  return (
    <div>
      <SortableContext id={props.title} items={props.tasks}>
        <div ref={setNodeRef} className="flex flex-col gap-2 h-[340px]">
          {props.tasks.map((task) => (
            <TaskItem key={task} title={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
