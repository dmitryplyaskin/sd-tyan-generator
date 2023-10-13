import {
	Box,
	Card,
	CardBody,
	Heading,
	IconButton,
	Stack,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

import { Handle, Position, useNodeId, useUpdateNodeInternals } from 'reactflow'
import { BranchStepInterface } from '../../types'
import { useEffect, useMemo, useRef } from 'react'

export const BranchNode: React.FC<{ data: BranchStepInterface }> = ({
	data,
}) => {
	console.log(data)
	const nodeId = useNodeId()

	const updateNodeInternals = useUpdateNodeInternals()

	const handleList = useMemo(() => {
		return (
			data.values.type === 'default'
				? data.values.data
				: Object.keys(data.values.data)
		).map(x => ({ label: x, id: nodeId + '-' + x }))
	}, [data.values.data, data.values.type, nodeId])

	useEffect(() => {
		if (nodeId) updateNodeInternals(nodeId)
	}, [handleList, data.id, updateNodeInternals, nodeId])

	return (
		<>
			<Handle type="target" position={Position.Top} />
			<Card border="1px">
				<CardBody pb={0}>
					<Stack
						spacing={4}
						display={'flex'}
						flexDirection={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Heading size="sm">{data?.name}</Heading>
						<IconButton aria-label="settings" icon={<SettingsIcon />} />
					</Stack>
					<Stack
						spacing={2}
						display={'flex'}
						flexDirection={'row'}
						justifyContent={'space-between'}
						transform={'translateY(7px)'}
					>
						{handleList.map(x => {
							return (
								<Box key={x.id} pointerEvents="none" p={2}>
									{x.label}
									<Handle
										type="source"
										position={Position.Bottom}
										id={x.id}
										style={{
											position: 'relative',
										}}
									></Handle>
								</Box>
							)
						})}
					</Stack>
				</CardBody>
			</Card>
		</>
	)
}
