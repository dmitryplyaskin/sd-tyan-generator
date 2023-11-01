import { Card, CardBody } from '@chakra-ui/react'

import { Handle, Position } from 'reactflow'
import { NodeTitle } from './_components_'
import { SimpleNodeType } from '../../../model/types'
import { useSelectedNode } from '../hooks/use-selected-node'

export const SimpleNode: React.FC<SimpleNodeType> = node => {
	const isSelected = useSelectedNode(node.id)

	return (
		<>
			<Handle type="target" position={Position.Top} />
			<Card border="1px" sx={isSelected ? { borderColor: 'blue' } : {}}>
				<CardBody>
					<NodeTitle {...node} />
				</CardBody>
			</Card>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	)
}
