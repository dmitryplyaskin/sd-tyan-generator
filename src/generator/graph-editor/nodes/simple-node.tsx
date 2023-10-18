import { Card, CardBody } from '@chakra-ui/react'

import { Handle, Position } from 'reactflow'
import { NodeTitle } from './_components_'
import { SimpleNodeType } from '../model/types'

export const SimpleNode: React.FC<SimpleNodeType> = node => {
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
