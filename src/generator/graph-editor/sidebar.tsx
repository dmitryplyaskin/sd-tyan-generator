/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, CardBody, Heading, Stack } from '@chakra-ui/react'
import React from 'react'

export const SideBar = () => {
	const onDragStart = (event: any, nodeType: any) => {
		event.dataTransfer.setData('application/reactflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}

	return (
		<Card>
			<CardBody>
				<Stack spacing={2}>
					<Heading size="sm">Выберите ноду и перетащите ее</Heading>
					<Node
						title={'Simple Node'}
						onDragStart={event => onDragStart(event, 'SimpleNode')}
						draggable
					/>
					<Node
						title={'Branch Node'}
						onDragStart={event => onDragStart(event, 'BranchNode')}
						draggable
					/>
					<Node
						title={'Template Node'}
						onDragStart={event => onDragStart(event, 'TemplateNode')}
						draggable
					/>
				</Stack>
			</CardBody>
		</Card>
	)
}

const Node: React.FC<{
	title: string
	draggable?: boolean
	onDragStart: (event: any, nodeType: any) => void
}> = ({ title, ...props }) => (
	// @ts-expect-error
	<Card border="1px" {...props}>
		<CardBody p={3}>
			<Heading size="sm">{title}</Heading>
		</CardBody>
	</Card>
)
