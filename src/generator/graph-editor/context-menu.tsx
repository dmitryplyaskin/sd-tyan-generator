/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, ButtonGroup, Card, CardBody } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'

export type ContextMenuOptions = {
	id: string
	placement: {
		top: number
		left: number
	}
}

type ContextMenuProps = ContextMenuOptions & {
	onClick: () => void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
	id,
	placement,
	...props
}) => {
	const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
	const duplicateNode = useCallback(() => {
		const node = getNode(id)
		if (node) {
			const position = {
				x: node.position.x + 150,

				y: node.position.y + 150,
			}

			addNodes({ ...node, id: `${new Date().getTime()}`, position })
		}
	}, [id, getNode, addNodes])

	const deleteNode = useCallback(() => {
		setNodes(nodes => nodes.filter(node => node.id !== id))
		setEdges(edges => edges.filter(edge => edge.source !== id))
	}, [id, setNodes, setEdges])

	return (
		<Card
			style={{
				top: placement.top,
				left: placement.left,
				zIndex: 10,
				position: 'absolute',
			}}
			border={'1px'}
			className="context-menu"
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
