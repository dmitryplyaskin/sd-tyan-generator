import ReactFlow, { Controls, Background, ReactFlowProvider } from 'reactflow'
import { useState, useCallback, useMemo, useRef } from 'react'
import 'reactflow/dist/style.css'
import { SimpleNode } from './nodes/simple-node'
import { StartNode } from './nodes/start'
import { BranchNode } from './nodes/branch-node'
import { TemplateNode } from './nodes/template-node'
import { SideBar } from './sidebar'
import { Card, CardBody, Stack } from '@chakra-ui/react'
import { Menu } from '../menu'
import { useStore } from 'effector-react'
import {
	$nodeData,
	onConnectEdge,
	onEdgesChange,
	onNodeAdd,
	onNodesChange,
} from './model'
import { EditNode } from './edit-node'

export const GraphEditor = () => {
	const { nodes, edges } = useStore($nodeData)

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
				id: `${new Date().getTime()}`,
				type,
				position,
				data: { name: `${type}`, values: { type: 'default', data: [''] } },
			}

			onNodeAdd(newNode)
		},
		[reactFlowInstance]
	)

	return (
		<>
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
								onConnect={onConnectEdge}
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
			<EditNode />
		</>
	)
}
