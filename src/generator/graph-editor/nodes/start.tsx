import { Card, CardBody, Heading } from '@chakra-ui/react'

import { Handle, Position } from 'reactflow'
import { useSelectedNode } from '../hooks/use-selected-node'
import { StartNodeType } from '../model/types'

export const StartNode: React.FC<StartNodeType> = node => {
	const isSelected = useSelectedNode(node.id)

	return (
		<>
			<Card
				border="1px"
				bgColor="green.100"
				sx={isSelected ? { borderColor: 'blue' } : {}}
			>
				<CardBody>
					<Heading size="sm">Start</Heading>
				</CardBody>
			</Card>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	)
}
