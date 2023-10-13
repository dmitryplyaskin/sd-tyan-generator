/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, createEvent, combine } from 'effector'
import {
	Edge,
	NodeChange,
	EdgeChange,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	Connection,
} from 'reactflow'
import { NodeType, NodesType } from './types'

export const $nodes = createStore<NodesType>([
	{
		id: '1',
		type: 'StartNode',
		position: { x: 0, y: 0 },
		data: null,
	},
])
export const $edges = createStore<Edge[]>([])

export const onNodesChange = createEvent<NodeChange[]>()
export const onNodeAdd = createEvent<NodeType>()

export const onEdgesChange = createEvent<EdgeChange[]>()
export const onConnectEdge = createEvent<Edge | Connection>()

$nodes
	.on(
		onNodesChange,
		(state, data) => applyNodeChanges(data, state) as NodesType
	)
	.on(onNodeAdd, (state, data) => [...state, data])

$edges
	.on(onEdgesChange, (state, data) => applyEdgeChanges(data, state))
	.on(onConnectEdge, (state, data) => addEdge(data, state))

export const $nodeData = combine({
	nodes: $nodes,
	edges: $edges,
})

$nodeData.watch(console.log)
