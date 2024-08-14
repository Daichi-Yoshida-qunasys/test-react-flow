import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import { CustomNode } from './components/CustomNode';

const nodes = [
  {
    id: '1',
    type: 'customNode',
    data: {
      label: '重合',
      count: 1,
      evaluations: [{ label: '評価1' }],
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'customNode',
    data: {
      label: '脱臭濃縮',
      count: 2,
      evaluations: [{ label: '評価1' }, { label: '評価2' }],
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'customNode',
    data: {
      label: '(再)分散',
      count: 3,
      evaluations: [{ label: '評価1' }, { label: '評価2' }, { label: '評価3' }],
    },
    position: { x: 200, y: 200 },
  },
  {
    id: '4',
    type: 'customNode',
    data: {
      label: '調整',
      count: 4,
      evaluations: [
        { label: '評価1' },
        { label: '評価2' },
        { label: '評価3' },
        { label: '評価4' },
      ],
    },
    position: { x: 200, y: 300 },
  },
  {
    id: '5',
    type: 'customNode',
    data: {
      label: '凝固',
      count: 5,
      evaluations: [
        { label: '評価1' },
        { label: '評価2' },
        { label: '評価3' },
        { label: '評価4' },
        { label: '評価5' },
      ],
    },
    position: { x: 400, y: 400 },
  },
];

const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
      height: 8,
      width: 8,
    },
    sourceHandle: 'bottom',
    targetHandle: 'left',
    style: { stroke: '#64748b', strokeWidth: 3 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
      height: 8,
      width: 8,
    },
    sourceHandle: 'bottom',
    targetHandle: 'left',
    style: { stroke: '#64748b', strokeWidth: 3 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
      height: 8,
      width: 8,
    },
    sourceHandle: 'bottom',
    targetHandle: 'left',
    style: { stroke: '#64748b', strokeWidth: 3 },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
      height: 8,
      width: 8,
    },
    sourceHandle: 'bottom',
    targetHandle: 'left',
    style: { stroke: '#64748b', strokeWidth: 3 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '5',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#64748b',
      height: 8,
      width: 8,
    },
    sourceHandle: 'bottom',
    targetHandle: 'left',
    style: { stroke: '#64748b', strokeWidth: 3 },
  },
];

const nodeTypes = { customNode: CustomNode };

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">React flow</h1>
      <div style={{ width: '800px', height: '540px', padding: '4px' }}>
        <ReactFlow
          colorMode="dark"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView={true}
        >
          <Background
            className="bg-gray-300"
            variant={BackgroundVariant.Dots}
          />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default App;
