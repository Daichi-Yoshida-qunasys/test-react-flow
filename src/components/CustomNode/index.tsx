import {
  autoUpdate,
  useFloating,
  offset,
  useDismiss,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

type Props = {
  data: {
    label: string;
    count: number;
    evaluations: [
      {
        label: string;
      }
    ];
  };
};

export function CustomNode({ data }: Props) {
  const { label, count, evaluations } = data;

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(4)],
    whileElementsMounted: autoUpdate,
    placement: 'right-end',
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  return (
    <>
      <div className="relative bg-green-800 shadow-md w-32 h-8 rounded-md">
        <Handle type="target" position={Position.Top} id="top" />
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          ref={refs.setReference}
          {...getReferenceProps()}
          className="h-4 w-4 absolute top-0 right-0 cursor-pointer rounded-full bg-yellow-500 text-black text-xs translate-y-1/2 translate-x-1/2"
        >
          {count}
        </div>
        <Handle type="target" position={Position.Left} id="left" />
        <div className="flex items-center h-full w-full justify-center">
          <div className="text-white">{label}</div>
        </div>
        <Handle type="source" position={Position.Bottom} id="bottom" />
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="bg-white text-black flex flex-col items-center gap-2 p-2 rounded-md shadow-md"
        >
          {evaluations.map(({ label }, index) => (
            <div
              key={index}
              className="bg-yellow-300 shadow-md w-32 h-8 rounded-md text-black text-center "
            >
              <div className="flex items-center h-full w-full justify-center">
                <div className="text-black">{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
