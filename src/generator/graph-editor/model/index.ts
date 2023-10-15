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
import {
	BranchNodeType,
	AllNodeType,
	NodesType,
	SimpleNodeType,
	TemplateNodeType,
} from './types'

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
export const onNodeAdd = createEvent<AllNodeType>()

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
