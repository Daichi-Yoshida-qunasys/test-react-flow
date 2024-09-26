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
import { Select, Option } from './components/MultipleSelect';
import { Card } from './components/Card';
import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TaskList } from './components/TaskList';

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

interface ITaskList {
  [key: string]: string[];
}

function App() {
  const [taskList, setTaskList] = useState<ITaskList>({
    unassignedColumnList: ['Learn React', 'Learn dnd-kit', 'Learn Typescript'],
    columnList: ['Learn CSS'],
    // Done: [],
  });

  const dragEndHandler = (e: DragEndEvent) => {
    // アイテムが不明な領域にドラッグされていないか確認する
    if (!e.over || !e.active.data.current || !e.over.data.current) return;

    // アイテムの位置が同じかどうか確認する
    if (e.active.id === e.over.id) return;

    // アイテムが列外に移動されているかどうかを確認する
    if (
      e.active.data.current.sortable.containerId !==
      e.over.data.current.sortable.containerId
    )
      return;

    // アイテムのターゲット位置に基づいてアイテムリストの順序を並べ替えます
    const containerName = e.active.data.current.sortable.containerId;
    setTaskList((taskList) => {
      const temp = { ...taskList };
      if (!e.over) return temp;
      const oldIdx = temp[containerName].indexOf(e.active.id.toString());
      const newIdx = temp[containerName].indexOf(e.over.id.toString());
      temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx);
      return temp;
    });
  };

  const dragOverHandler = (e: DragOverEvent) => {
    // アイテムが不明な領域にドラッグされていないか確認する
    if (!e.over) return;

    // 初期およびターゲットのソート可能なリスト名を取得します。
    const initialContainer = e.active.data.current?.sortable?.containerId;
    const targetContainer = e.over.data.current?.sortable?.containerId;

    // ソート可能な初期リスト名がない場合、アイテムはソート可能なアイテムではありません
    if (!initialContainer) return;

    //ターゲットアイテムの位置に基づいてアイテムリストを並べ替える
    setTaskList((taskList) => {
      const temp = { ...taskList };
      // console.log('over', e.over?.id);
      // console.log('active', e.active.id);
      console.log('initial', initialContainer);
      console.log('target', targetContainer);

      // ターゲットコンテナがない場合、アイテムはドロップ可能な領域に移動されます。
      // droppable = ソート可能なリストの領域全体（ソート可能なリストが空のときに機能します）
      if (!targetContainer) {
        //アイテムがすでに存在する場合は、再度追加しないでください
        // if (taskList[e.over!.id].includes(e.active.id.toString())) return temp;

        // 初期コンテナからアイテムを削除します
        temp[initialContainer] = temp[initialContainer].filter(
          (task) => task !== e.active.id.toString()
        );

        // ドロップ可能なゾーンが属するターゲットコンテナにアイテムを追加します
        temp[e.over!.id].push(e.active.id.toString());

        return temp;
      }

      // アイテムが同じコンテナ内でドラッグされている場合は、リストを並べ替えるだけです
      if (initialContainer === targetContainer) {
        const oldIdx = temp[initialContainer].indexOf(e.active.id.toString());
        const newIdx = temp[initialContainer].indexOf(e.over!.id.toString());
        temp[initialContainer] = arrayMove(
          temp[initialContainer],
          oldIdx,
          newIdx
        );
      } else {
        // アイテムを別のコンテナにドラッグすると

        // 初期コンテナからアイテムを削除します
        temp[initialContainer] = temp[initialContainer].filter(
          (task) => task !== e.active.id.toString()
        );

        // アイテムをターゲットコンテナに追加する
        const newIdx = temp[targetContainer].indexOf(e.over!.id.toString());
        temp[targetContainer].splice(newIdx, 0, e.active.id.toString());
      }

      return temp;
    });
  };

  const keys = Object.keys(taskList);
  const firstKey = keys[0];
  const secondKey = keys[1];

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
      <Select>
        <Option label="Apple" />
        <Option label="Blueberry" />
        <Option label="Watermelon" />
        <Option label="Banana" />
      </Select>
      <div className="w-full flex flex-col gap-6">
        <div className="text-white">パンくずリスト</div>
        <Card title="工程名">
          <span className="text-gray-800">ガイド</span>
        </Card>
        <DndContext onDragEnd={dragEndHandler} onDragOver={dragOverHandler}>
          <div className="flex gap-6 w-full items-start justify-center">
            <div className="w-full flex flex-col gap-6">
              {/* <Card title="項目追加">
                <span className="text-gray-800">追加</span>
              </Card> */}
              <Card className="w-full" title="テーブルに未反映の項目一覧">
                <TaskList
                  key={firstKey}
                  title={firstKey}
                  tasks={taskList[firstKey]}
                />
              </Card>
            </div>
            <Card title="テーブル一覧" className="w-full">
              <TaskList
                key={secondKey}
                title={secondKey}
                tasks={taskList[secondKey]}
              />
            </Card>
          </div>
        </DndContext>
      </div>
    </>
  );
}

export default App;
