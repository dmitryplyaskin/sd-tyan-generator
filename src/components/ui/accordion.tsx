import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
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
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({
	title,
	list,
}) => {
	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem border="1px" borderRadius="md" overflow="hidden">
				<h2>
					<AccordionButton
						background={'white'}
						_hover={{ bg: 'blue.100' }}
						py="3"
					>
						<Box as="span" flex="1" textAlign="left">
							<Heading size={'sm'}>{title}</Heading>
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
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
}) => (
	<Box
		px="4"
		py="2"
		cursor="pointer"
		_hover={{ bg: 'blue.100' }}
		sx={isActive ? { bg: 'blue.200' } : {}}
		onClick={onClick}
	>
		{name}
	</Box>
)
