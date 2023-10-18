/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactFlow, {
	Controls,
	Background,
	ReactFlowProvider,
	NodeMouseHandler,
	OnInit,
} from 'reactflow'
import { useState, useCallback, useRef } from 'react'
import 'reactflow/dist/style.css'
import { SideBar } from './sidebar'
import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	Input,
	Stack,
} from '@chakra-ui/react'
import { Menu } from '../menu'
import { useStore } from 'effector-react'
import {
	$nodeData,
	onConnectEdge,
	onEdgesChange,
	onNodeAdd,
	onNodesChange,
	onUpdateEdge,
	onUpdateEdgeEnd,
	resetEdges,
} from './model'
import { EditNode } from './edit-node'
import { EditableNodeType } from './model/types'
import { ContextMenu, ContextMenuOptions } from './context-menu'
import { saveDataAsJSONFile } from '../../utils/save-data-as-json-file'
import { loadTemplate } from './model/templates'
import { nodeTypes } from './nodes'

export const GraphEditor = () => {
	const { nodes, edges } = useStore($nodeData)
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
				const type = event.dataTransfer.getData('application/reactflow')

				if (typeof type === 'undefined' || !type) {
					return
				}

				//@ts-expect-error
				const position = reactFlowInstance?.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				})

				let newNode = {} as EditableNodeType

				if (type === 'SimpleNode') {
					newNode = {
						id: `${new Date().getTime()}`,
						type,
						position,
						data: {
							name: `${type}`,
							// @ts-expect-error
							type,
							values: {
								type: 'default',
								data: ['value1', 'value2'],
							},
							optional: { isOptional: false, value: 0.5 },
							range: { isRange: false, value: [1, 2] },
						},
					}
				}
				if (type === 'BranchNode') {
					newNode = {
						id: `${new Date().getTime()}`,
						type,
						position,
						data: {
							name: `${type}`,
							// @ts-expect-error
							type,
							values: {
								type: 'default',
								data: ['branch-1', 'branch-2'],
							},
							optional: { isOptional: false, value: 0.5 },
							range: { isRange: false, value: [1, 2] },
						},
					}
				}
				if (type === 'TemplateNode') {
					newNode = {
						id: `${new Date().getTime()}`,
						type,
						position,
						data: {
							name: `${type}`,
							// @ts-expect-error
							type,
							templates: {
								type: 'default',
								data: ['${key1} is ${key3}', '${key2}'],
							},
							keys: {
								['key1']: {
									type: 'default',
									data: ['value1', 'value2'],
								},
								['key2']: {
									type: 'weight',
									data: {
										value1: 10,
										value2: 30,
									},
								},
							},
							optional: { isOptional: false, value: 0.5 },
							range: { isRange: false, value: [1, 2] },
						},
					}
				}

				onNodeAdd(newNode)
			}
		},
		[reactFlowInstance]
	)

	const onNodeContextMenu = useCallback<NodeMouseHandler>(
		(event, node) => {
			event.preventDefault()
			if (ref.current) {
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

	const handleFileChange = (e: any) => {
		const file = e.target.files[0]

		const reader = new FileReader()

		reader.onload = () => {
			const text = reader.result as string
			loadTemplate(JSON.parse(text))
		}

		reader.readAsText(file)
	}

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
								<ButtonGroup
									spacing="2"
									position={'absolute'}
									top={'2'}
									right={'2'}
									zIndex={11}
								>
									<Input
										type="file"
										hidden
										id="fileUpload"
										onChange={handleFileChange}
									/>
									<Button
										variant="outline"
										colorScheme="blue"
										onClick={() =>
											document.getElementById('fileUpload')?.click()
										}
									>
										Загрузить
									</Button>
									<Button
										variant="solid"
										colorScheme="blue"
										onClick={() => saveDataAsJSONFile()}
									>
										Скачать
									</Button>
									<Button
										variant="solid"
										colorScheme="red"
										onClick={() => resetEdges()}
									>
										Сбросить связи
									</Button>
								</ButtonGroup>
							</ReactFlow>
						</CardBody>
					</Card>
				</Stack>
			</ReactFlowProvider>

			<EditNode />
		</>
	)
}
