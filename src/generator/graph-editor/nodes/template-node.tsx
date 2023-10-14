import { Card, CardBody } from '@chakra-ui/react'

import { Handle, Position } from 'reactflow'
import { TemplateNodeType } from '../model/types'
import { NodeTitle } from './_components_'

export const TemplateNode: React.FC<TemplateNodeType> = node => {
	return (
		<>
			<Handle type="target" position={Position.Top} />
			<Card border="1px">
				<CardBody>
					<NodeTitle {...node} />
				</CardBody>
			</Card>
			<Handle type="source" position={Position.Bottom} id="a" />
		</>
	)
}
