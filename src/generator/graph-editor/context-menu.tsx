/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, ButtonGroup, Card, CardBody } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useReactFlow } from 'reactflow'

export default function ContextMenu(
	// @ts-expect-error
	{ id, top, left, right, bottom, ...props }
) {
	const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
	const duplicateNode = useCallback(() => {
		const node = getNode(id)
		const position = {
			// @ts-expect-error
			x: node.position.x + 150,
			// @ts-expect-error
			y: node.position.y + 150,
		}
		// @ts-expect-error
		addNodes({ ...node, id: `${new Date().getTime()}`, position })
	}, [id, getNode, addNodes])

	const deleteNode = useCallback(() => {
		setNodes(nodes => nodes.filter(node => node.id !== id))
		setEdges(edges => edges.filter(edge => edge.source !== id))
	}, [id, setNodes, setEdges])

	return (
		<Card
			style={{ top, left, right, bottom, zIndex: 10, position: 'absolute' }}
			className="context-menu"
			{...props}
			onClick={props.onClick}
		>
			<CardBody>
				<p style={{ margin: '0.5em' }}>
					<small>node: {id}</small>
				</p>
				<ButtonGroup w="full">
					<Button onClick={duplicateNode}>duplicate</Button>
					<Button onClick={deleteNode}>delete</Button>
				</ButtonGroup>
			</CardBody>
		</Card>
	)
}
