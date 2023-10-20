/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, createEvent, combine, sample } from 'effector'

import {
	Edge,
	NodeChange,
	EdgeChange,
	applyNodeChanges,
	applyEdgeChanges,
	Connection,
	updateEdge,
} from 'reactflow'
import {
	BranchNodeType,
	AllNodeType,
	NodesType,
	SimpleNodeType,
	TemplateNodeType,
} from './types'
import { $activeTemplate } from './templates'
import { generatePrompts } from './generatePrompts'
import { connectionEdgesHandler } from './utils'

const DEFAULT_NODES: NodesType = [
	{
		id: '1',
		type: 'StartNode',
		position: { x: 0, y: 0 },
		data: null,
	},
]

export const $nodes = createStore<NodesType>(DEFAULT_NODES)

export const $edges = createStore<Edge[]>([])

export const onNodesChange = createEvent<NodeChange[]>()
export const onNodeAdd = createEvent<AllNodeType>()

export const onEdgesChange = createEvent<EdgeChange[]>()
export const resetEdges = createEvent()
export const onConnectEdge = createEvent<Edge | Connection>()
export const onUpdateEdge = createEvent<{
	edge: Edge
	connection: Connection
}>()
export const onUpdateEdgeEnd = createEvent<Edge>()

export const resetAllNodesAndEdges = createEvent()

$nodes
	.on(
		onNodesChange,
		(state, data) => applyNodeChanges(data, state) as NodesType
	)
	.on(onNodeAdd, (state, data) => [...state, data])
	.on(resetAllNodesAndEdges, () => DEFAULT_NODES)

$edges
	.on(onEdgesChange, (state, data) => applyEdgeChanges(data, state))
	.on(onConnectEdge, connectionEdgesHandler)
	.on(onUpdateEdge, (state, { edge, connection }) =>
		updateEdge(edge, connection, state)
	)
	.on(onUpdateEdgeEnd, (state, data) => state.filter(e => e.id !== data.id))
	.on(resetEdges, () => [])
	.on(resetAllNodesAndEdges, () => [])

export const $nodeData = combine({
	nodes: $nodes,
	edges: $edges,
})

export const changeSimpleType = createEvent<SimpleNodeType>()
export const changeBranchType = createEvent<BranchNodeType>()
export const changeTemplateType = createEvent<TemplateNodeType>()

$nodes
	.on(changeSimpleType, (state, data) => {
		return state.map(x => {
			if (x.id === data.id && x.type === 'SimpleNode') {
				return { ...x, ...data }
			}
			return x
		})
	})
	.on(changeBranchType, (state, data) => {
		return state.map(x => {
			if (x.id === data.id && x.type === 'BranchNode') {
				return { ...x, ...data }
			}
			return x
		})
	})
	.on(changeTemplateType, (state, data) => {
		return state.map(x => {
			if (x.id === data.id && x.type === 'TemplateNode') {
				return { ...x, ...data }
			}
			return x
		})
	})

$nodes.on($activeTemplate, (_, data) => data?.nodes)
$edges.on($activeTemplate, (_, data) => data?.edges)

export const $generateResult = createStore('')
export const generate = createEvent<{ count: number }>()

sample({
	source: $nodeData,
	clock: generate,
	fn: generatePrompts,
	target: $generateResult,
})
