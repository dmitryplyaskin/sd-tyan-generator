import { Card, CardBody } from '@chakra-ui/react'

import { Handle, Position } from 'reactflow'
import { TemplateNodeType } from '../model/types'
import { NodeTitle } from './_components_'
import { useSelectedNode } from '../hooks/use-selected-node'

export const TemplateNode: React.FC<TemplateNodeType> = node => {
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
