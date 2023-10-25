import { createStore } from 'effector/effector.mjs'
import {
	closePage,
	createPage,
	deletePage,
	duplicatePage,
	openPage,
} from './pages'
import {
	AllNodeType,
	NodeNameType,
	NodesType,
	PageType,
} from '../generator/graph-editor/model/types'
import persist from 'effector-localstorage'
import { createEvent } from 'effector/compat'
import {
	Connection,
	Edge,
	EdgeChange,
	NodeChange,
	applyEdgeChanges,
	applyNodeChanges,
	updateEdge,
} from 'reactflow'
import { changeEdges, changeNodes } from './utils/node-editor'
import { connectionEdgesHandler } from '../generator/graph-editor/model/utils/edge-connection'

const DEFAULT_NODES: NodesType = [
	{
		id: '1',
		type: NodeNameType.StartNode,
		position: { x: 0, y: 0 },
		data: null,
	},
]

export const $currentPage = createStore<PageType | null>(null)

$currentPage
	.on([openPage, createPage, duplicatePage], (_, page) => page)
	.on([closePage, deletePage], (state, page) =>
		state?.id === page.id ? null : state
	)

export const $nodeEditor = $currentPage.map(x => ({
	nodes: x?.nodes || [],
	edges: x?.edges || [],
}))

export const $nodesCount = $nodeEditor.map(x => x.nodes.length)

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

$currentPage
	.on(
		onNodesChange,
		changeNodes((state, data) => applyNodeChanges(data, state) as NodesType)
	)
	.on(
		onNodeAdd,
		changeNodes((state, data) => [...state, data])
	)
	.on(
		resetAllNodesAndEdges,
		changeNodes(() => DEFAULT_NODES)
	)

$currentPage
	.on(
		onEdgesChange,
		changeEdges((state, data) => applyEdgeChanges(data, state))
	)
	.on(onConnectEdge, changeEdges(connectionEdgesHandler))
	.on(
		onUpdateEdgeEnd,
		changeEdges((state, data) => state.filter(e => e.id !== data.id))
	)
	.on(
		[resetEdges, resetAllNodesAndEdges],
		changeEdges(() => [])
	)
	.on(
		onUpdateEdge,
		changeEdges((state, { edge, connection }) =>
			updateEdge(edge, connection, state)
		)
	)

persist({ store: $currentPage, key: 'currentPage' })
