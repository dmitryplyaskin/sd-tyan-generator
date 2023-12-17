/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactFlow, {
	Controls,
	Background,
	ReactFlowProvider,
	NodeMouseHandler,
	OnInit,
	XYPosition,
} from 'reactflow'
import { useState, useCallback, useRef } from 'react'
import 'reactflow/dist/style.css'

import { Card, CardBody, Stack } from '@chakra-ui/react'

import { useStore } from 'effector-react'
import { EditNode } from './edit-node'
import { ContextMenu, ContextMenuOptions } from './components/context-menu'
import { nodeTypes } from './nodes'
import { EditorMenu } from './components/editor-menu'
import { createNode } from './utils/add-node'
import { NodeNameType } from '../../model/types'
import {
	$nodeEditor,
	onNodeAdd,
	onNodesChange,
	onConnectEdge,
	onEdgesChange,
	onUpdateEdge,
	onUpdateEdgeEnd,
} from '../../model'

export const GraphEditor = () => {
	const { nodes, edges } = useStore($nodeEditor)
	const [menu, setMenu] = useState<ContextMenuOptions | null>(null)
	const ref = useRef<HTMLDivElement | null>(null)
	const edgeUpdateSuccessful = useRef(true)

	const reactFlowWrapper = useRef<HTMLDivElement | null>(null)
	const [reactFlowInstance, setReactFlowInstance] = useState<OnInit<
		any,
		any
	> | null>(null)
	// @ts-expect-error
	const onDragOver = useCallback(event => {
		event.preventDefault()
		event.dataTransfer.dropEffect = 'move'
	}, [])

	const onDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
		event => {
			event.preventDefault()
			if (reactFlowWrapper.current) {
				const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
				const type = event.dataTransfer.getData(
					'application/reactflow'
				) as NodeNameType

				if (typeof type === 'undefined' || !type) {
					return
				}

				//@ts-expect-error
				const position = reactFlowInstance?.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				}) as XYPosition

				const newNode = createNode(type, position)

				onNodeAdd(newNode)
			}
		},
		[reactFlowInstance]
	)
	
	const onNodeContextMenu = useCallback<NodeMouseHandler>(
		(event, node) => {
			event.preventDefault()
			if (ref.current && node.type !== NodeNameType.StartNode) {
				setMenu({
					id: node.id,
					placement: {
						top: event.clientY - 100,
						left: event.clientX - 200,
					},
				})
			}
		},
		[setMenu]
	)
	const onPaneClick = useCallback(() => setMenu(null), [setMenu])

	const onEdgeUpdateStart = useCallback(() => {
		edgeUpdateSuccessful.current = false
	}, [])

	// @ts-expect-error
	const onEdgeUpdate = useCallback((edge, connection) => {
		edgeUpdateSuccessful.current = true
		onUpdateEdge({ edge, connection })
	}, [])
	// @ts-expect-error
	const onEdgeUpdateEnd = useCallback((_, edge) => {
		if (!edgeUpdateSuccessful.current) {
			onUpdateEdgeEnd(edge)
		}

		edgeUpdateSuccessful.current = true
	}, [])

	return (
		<>
			<ReactFlowProvider>
				<Stack spacing={4} display="flex" flexDirection="row" w="100%" h="100%">
					<Card sx={{ h: '100%', w: '100%' }} ref={reactFlowWrapper}>
						<CardBody>
							<ReactFlow
								ref={ref}
								nodes={nodes}
								onNodesChange={onNodesChange}
								edges={edges}
								onEdgesChange={onEdgesChange}
								onEdgeUpdate={onEdgeUpdate}
								onEdgeUpdateStart={onEdgeUpdateStart}
								onEdgeUpdateEnd={onEdgeUpdateEnd}
								onConnect={onConnectEdge}
								// @ts-expect-error
								nodeTypes={nodeTypes}
								// @ts-expect-error
								onInit={setReactFlowInstance}
								onDrop={onDrop}
								onDragOver={onDragOver}
								onNodeContextMenu={onNodeContextMenu}
							>
								<Background />
								<Controls />

								{menu && <ContextMenu onClick={onPaneClick} {...menu} />}
								<EditorMenu />
							</ReactFlow>
						</CardBody>
					</Card>
				</Stack>
			</ReactFlowProvider>
			<EditNode />
		</>
	)
}
