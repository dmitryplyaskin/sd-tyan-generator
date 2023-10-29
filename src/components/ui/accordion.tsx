import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react'

export type AccordionItemComponentProps = {
	id: number
	name: string
	isActive?: boolean
	onClick: () => void
	onDelete?: () => void
	onEdit?: () => void
}

export type AccordionComponentProps = {
	title: string
	list: AccordionItemComponentProps[]
	onAdd?: () => void
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({
	title,
	list,
	onAdd,
}) => {
	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem border="1px" borderRadius="md" overflow="hidden">
				<Stack direction={'row'} alignItems={'center'} p="2">
					<AccordionButton
						background={'white'}
						width={'auto'}
						p="0"
						_hover={{ bg: 'white' }}
					>
						<AccordionIcon />
					</AccordionButton>
					<Box as="span" flex="1" textAlign="left">
						<Heading size={'sm'}>{title}</Heading>
					</Box>
					{onAdd && (
						<IconButton aria-label="add" size={'sm'} onClick={onAdd}>
							<AddIcon />
						</IconButton>
					)}
				</Stack>
				<AccordionPanel p="0" _first={{ borderTop: '1px' }}>
					<>
						{list.map(x => (
							<Item key={x.id} {...x} />
						))}
					</>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

const Item: React.FC<AccordionItemComponentProps> = ({
	name,
	isActive,
	onClick,
	onDelete,
	onEdit,
}) => (
	<Box
		px="4"
		py="2"
		_hover={{ bg: 'blue.100' }}
		sx={isActive ? { bg: 'blue.200' } : {}}
		display={'flex'}
		alignItems={'center'}
		gap="2"
		cursor="pointer"
	>
		<Text mr="auto" w={'full'} onClick={onClick}>
			{name}
		</Text>

		{onEdit && (
			<IconButton aria-label="edit" onClick={onEdit} size={'xs'}>
				<EditIcon />
			</IconButton>
		)}
		{onDelete && (
			<IconButton aria-label="delete" onClick={onDelete} size={'xs'}>
				<DeleteIcon />
			</IconButton>
		)}
	</Box>
)
