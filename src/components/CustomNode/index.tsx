import { Handle, Position } from '@xyflow/react';

type Props = {
  data: {
    label: string;
    count: number;
  };
};

export function CustomNode({ data }: Props) {
  const { label, count } = data;
  return (
    <div className="relative bg-green-800 shadow-md w-32 h-8 rounded-md">
      <div className="h-4 w-4 absolute top-0 right-0 rounded-full bg-yellow-500 text-black text-xs translate-y-1/2 translate-x-1/2">
        {count}
      </div>
      <Handle type="target" position={Position.Left} id="left" />
      <div className="flex items-center h-full w-full justify-center">
        <div className="text-white">{label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
