import { createStore } from 'effector/effector.mjs'
import {
	closePage,
	createPage,
	deletePage,
	duplicatePage,
	openPage,
	saveEditPage,
	savePage,
} from './pages'
import { AllNodeType, NodeNameType, NodesType, PageType } from './types'
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
import {
	changeEdges,
	changeNodeData,
	changeNodes,
	disableNodeBranch,
} from './utils/change-data-helpers'
import { connectionEdgesHandler } from './utils/edge-connection'
import { sample } from 'effector'
import { generatePrompts } from './utils/generate-prompts'
import { debounce } from 'patronum'
import { $globalVars } from './global-vars'

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
	.on(saveEditPage, (state, page) => (state?.id === page.id ? page : state))
	.on([closePage, deletePage], (state, page) =>
		state?.id === page.id ? null : state
	)

export const $nodeEditor = $currentPage.map(x => ({
	nodes: x?.nodes || [],
	edges: x?.edges || [],
}))

export const $currentNodesCount = $nodeEditor.map(x => x.nodes.length)
export const $currentNodes = $nodeEditor.map(x => x.nodes)

export const onNodesChange = createEvent<NodeChange[]>()
export const onNodeAdd = createEvent<AllNodeType>()
export const onNodeDataChange = createEvent<AllNodeType>()

export const onNodeDisableBranches = createEvent<{
	id: string
	disabled: string
}>()

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
	.on(onNodeDataChange, changeNodes(changeNodeData))
	.on(onNodeDisableBranches, changeNodes(disableNodeBranch))

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

export const $generateResult = createStore('')
export const generate = createEvent<{ count: number }>()

sample({
	source: { nodeEditor: $nodeEditor, globalVars: $globalVars },
	clock: generate,
	fn: generatePrompts,
	target: $generateResult,
})

const saveCurrentChanges = createEvent<PageType | null>()
const debounced = debounce({
	source: saveCurrentChanges,
	timeout: 500,
})

sample({
	source: $currentPage,
	clock: $currentPage,
	fn: state => state,
	target: saveCurrentChanges,
})
sample({ clock: debounced, target: savePage })
