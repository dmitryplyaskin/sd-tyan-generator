import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import { useState, useCallback, useMemo } from "react";
import "reactflow/dist/style.css";
import { SimpleNode } from "./nodes/simple-node";
import { StartNode } from "./nodes/start";
import { BranchNode } from "./nodes/branch-node";

const initialNodes = [
  {
    id: "1",
    type: "StartNode",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "SimpleNode",
    position: { x: 0, y: 100 },
    data: {
      name: "Quality",
      targetTags: {},
      values: {
        type: "default",
        data: [
          "((4k,masterpiece,best quality))",
          "(masterpiece, best quality)",
          "masterpiece, best quality",
          "masterpiece",
          "best quality",
          "masterpiece, highres, best quality, ultra-detailed, perfect lighting",
          "(masterpiece),(best quality),(ultra-detailed)",
        ],
      },
    },
  },
  {
    id: "3",
    type: "SimpleNode",
    position: { x: 0, y: 200 },
    data: {
      name: "Some not very long text for node. Test",
      targetTags: {},
      values: {
        type: "default",
        data: [
          "((4k,masterpiece,best quality))",
          "(masterpiece, best quality)",
          "masterpiece, best quality",
          "masterpiece",
          "best quality",
          "masterpiece, highres, best quality, ultra-detailed, perfect lighting",
          "(masterpiece),(best quality),(ultra-detailed)",
        ],
      },
    },
  },

  {
    id: "4",
    type: "BranchNode",
    position: { x: 0, y: 400 },
    data: {
      name: "Character test long name? very long name",
      targetTags: {},
      values: {
        type: "default",
        data: [
          "female",
          "male",
          "alien",
          "animal",
          "unknown",
          "something strange",
        ],
      },
    },
  },
  {
    id: "1-1",
    type: "SimpleNode",
    position: { x: 0, y: 700 },
    data: {
      name: "Some1",
      targetTags: {},
      values: {
        type: "default",
        data: ["(masterpiece),(best quality),(ultra-detailed)"],
      },
    },
  },
  {
    id: "1-2",
    type: "SimpleNode",
    position: { x: 100, y: 700 },
    data: {
      name: "Some2",
      targetTags: {},
      values: {
        type: "default",
        data: ["(masterpiece),(best quality),(ultra-detailed)"],
      },
    },
  },
  {
    id: "1-3",
    type: "SimpleNode",
    position: { x: 200, y: 700 },
    data: {
      name: "Some3",
      targetTags: {},
      values: {
        type: "default",
        data: ["(masterpiece),(best quality),(ultra-detailed)"],
      },
    },
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
  },
];

export const GraphEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      StartNode: StartNode,
      SimpleNode: SimpleNode,
      BranchNode: BranchNode,
    }),
    []
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
