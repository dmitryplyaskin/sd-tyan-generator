/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Card, CardBody, Checkbox, Stack } from '@chakra-ui/react'

import { Handle, Position, useNodeId, useUpdateNodeInternals } from 'reactflow'

import { useEffect, useMemo } from 'react'
import { NodeTitle } from './_components_'
import { BranchNodeType } from '../../../model/types'
import { useSelectedNode } from '../hooks/use-selected-node'
import { onNodeDisableBranches } from '../../../model'

export const BranchNode: React.FC<BranchNodeType> = node => {
	const isSelected = useSelectedNode(node.id)
	const { data } = node
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
		// @ts-expect-error
	}, [handleList, data.id, updateNodeInternals, nodeId])

	return (
		<>
			<Handle type="target" position={Position.Top} />
			<Card border="1px" sx={isSelected ? { borderColor: 'blue' } : {}}>
				<CardBody pb={0}>
					<NodeTitle {...node} />
					<Stack
						spacing={2}
						display={'flex'}
						flexDirection={'row'}
						justifyContent={'space-between'}
						transform={'translateY(7px)'}
					>
						{handleList.map(x => {
							return (
								<Box key={x.id} p={2}>
									<Checkbox
										colorScheme="red"
										isChecked={data.disabled?.includes(x.label)}
										onChange={() =>
											onNodeDisableBranches({ id: node.id, disabled: x.label })
										}
									>
										{x.label}
									</Checkbox>
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
