import { Heading, IconButton, Stack } from '@chakra-ui/react'
import { EditableNodeType } from '../../../model/types'
import { SettingsIcon } from '@chakra-ui/icons'
import { openEditNode } from '../../../model/edit-node'

export const NodeTitle: React.FC<EditableNodeType> = ({ data, type, id }) => {
	return (
		<Stack
			spacing="4"
			display="flex"
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
		>
			<Heading size="sm">{data.name}</Heading>
			<IconButton
				aria-label="settings"
				onClick={() => openEditNode({ type, id, isOpen: true })}
				icon={<SettingsIcon />}
			/>
		</Stack>
	)
}
