import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	ReactFlowProvider,
} from 'reactflow'
import { useState, useCallback, useMemo, useRef } from 'react'
import 'reactflow/dist/style.css'
import { SimpleNode } from './nodes/simple-node'
import { StartNode } from './nodes/start'
import { BranchNode } from './nodes/branch-node'
import { TemplateNode } from './nodes/template-node'
import { SideBar } from './sidebar'
import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import { Menu } from '../menu'

const initialNodes = [
	{
		id: '1',
		type: 'StartNode',
		position: { x: 0, y: 0 },
	},
	{
		id: '2',
		type: 'SimpleNode',
		position: { x: 0, y: 100 },
		data: {
			name: 'Quality',
			targetTags: {},
			values: {
				type: 'default',
				data: [
					'((4k,masterpiece,best quality))',
					'(masterpiece, best quality)',
					'masterpiece, best quality',
					'masterpiece',
					'best quality',
					'masterpiece, highres, best quality, ultra-detailed, perfect lighting',
					'(masterpiece),(best quality),(ultra-detailed)',
				],
			},
		},
	},
	{
		id: '3',
		type: 'SimpleNode',
		position: { x: 0, y: 200 },
		data: {
			name: 'Style',
			targetTags: {},
			values: {
				type: 'default',
				data: [
					'((4k,masterpiece,best quality))',
					'(masterpiece, best quality)',
					'masterpiece, best quality',
					'masterpiece',
					'best quality',
					'masterpiece, highres, best quality, ultra-detailed, perfect lighting',
					'(masterpiece),(best quality),(ultra-detailed)',
				],
			},
		},
	},

	{
		id: '4',
		type: 'BranchNode',
		position: { x: 0, y: 400 },
		data: {
			name: 'Character',
			targetTags: {},
			values: {
				type: 'default',
				data: ['female', 'male', 'alien'],
			},
		},
	},
	{
		id: '1-1',
		type: 'SimpleNode',
		position: { x: 0, y: 700 },
		data: {
			name: 'Closes',
			targetTags: {},
			values: {
				type: 'default',
				data: ['(masterpiece),(best quality),(ultra-detailed)'],
			},
		},
	},
	{
		id: '1-2',
		type: 'SimpleNode',
		position: { x: 100, y: 700 },
		data: {
			name: 'Eyes',
			targetTags: {},
			values: {
				type: 'default',
				data: ['(masterpiece),(best quality),(ultra-detailed)'],
			},
		},
	},
	{
		id: '1-3',
		type: 'SimpleNode',
		position: { x: 200, y: 700 },
		data: {
			name: 'Hair',
			targetTags: {},
			values: {
				type: 'default',
				data: ['(masterpiece),(best quality),(ultra-detailed)'],
			},
		},
	},
]

const initialEdges = [
	{
		id: '1-2',
		source: '1',
		target: '2',
	},
	{
		id: '2-3',
		source: '2',
		target: '3',
	},
]

let id = 0
const getId = () => `dndnode_${id++}`

export const GraphEditor = () => {
	const [nodes, setNodes] = useState(initialNodes)
	const [edges, setEdges] = useState(initialEdges)

	const onNodesChange = useCallback(
		changes => setNodes(nds => applyNodeChanges(changes, nds)),
		[]
	)
	const onEdgesChange = useCallback(
		changes => setEdges(eds => applyEdgeChanges(changes, eds)),
		[]
	)

	const onConnect = useCallback(
		params => setEdges(eds => addEdge(params, eds)),
		[]
	)

	const nodeTypes = useMemo(
		() => ({
			StartNode: StartNode,
			SimpleNode: SimpleNode,
			BranchNode: BranchNode,
			TemplateNode: TemplateNode,
		}),
		[]
	)

	const reactFlowWrapper = useRef(null)
	const [reactFlowInstance, setReactFlowInstance] = useState(null)

	const onDragOver = useCallback(event => {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'
	}, [])

	const onDrop = useCallback(
		event => {
			event.preventDefault()

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
			const type = event.dataTransfer.getData('application/reactflow')

			// check if the dropped element is valid
			if (typeof type === 'undefined' || !type) {
				return
			}

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			})
			const newNode = {
				id: getId(),
				type,
				position,
				data: { name: `${type}`, values: { type: 'default', data: [''] } },
			}

			setNodes(nds => nds.concat(newNode))
		},
		[reactFlowInstance]
	)

	return (
		<ReactFlowProvider>
			<Stack spacing={4} display="flex" flexDirection="row" w="100%" h="100%">
				<Stack spacing={4} w="300px">
					<SideBar />
					<Menu />
				</Stack>

				<Card sx={{ h: '100%', w: '100%' }} ref={reactFlowWrapper}>
					<CardBody>
						<ReactFlow
							nodes={nodes}
							onNodesChange={onNodesChange}
							edges={edges}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							nodeTypes={nodeTypes}
							onInit={setReactFlowInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
						>
							<Background />
							<Controls />
						</ReactFlow>
					</CardBody>
				</Card>
			</Stack>
		</ReactFlowProvider>
	)
}
