import {
	Box,
	Button,
	Card,
	CardBody,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Heading,
	IconButton,
	Stack,
} from '@chakra-ui/react'
import { GlobalVarType } from '../model/types'
import { AddIcon } from '@chakra-ui/icons'
import { FormProvider, useForm } from 'react-hook-form'
import React from 'react'

const list = [{ name: 'clothes' }, { name: 'color' }, { name: 'hair color' }]

export const GlobalVar = () => {
	return (
		<Card maxH={'100%'} overflowY={'hidden'}>
			<CardBody maxH={'100%'}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Heading size="sm">Global variables</Heading>
					<IconButton aria-label="add" size="sm">
						<AddIcon />
					</IconButton>
				</Box>
				<Box mt="2" maxH={'100%'} overflowY="auto" overflowX="visible">
					{list.map((x, i) => (
						<MenuItem key={i} {...x} />
					))}
				</Box>
			</CardBody>
		</Card>
	)
}

const MenuItem: React.FC<GlobalVarType> = ({ name }) => {
	return (
		<Box
			cursor="pointer"
			py="2"
			px="4"
			mx="-4"
			sx={{
				'&:hover': {
					bg: 'blue.100',
				},
			}}
		>
			{name}
		</Box>
	)
}

export const EditNode = () => {
	const { isOpen } = useStore($editNode)
	const currentNode = useStore($currentEditNode)
	const btnRef = React.useRef<any>()
	const methods = useForm()

	const handleSubmit = (v: any) => {}

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={() => {}}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent maxW={'700px'}>
				<FormProvider {...methods}>
					<DrawerCloseButton />

					<DrawerHeader>Переменная {currentNode?.data.name}</DrawerHeader>

					<DrawerBody>
						<Stack spacing="4"></Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={() => {}}>
							Отменить
						</Button>
						<Button
							colorScheme="blue"
							onClick={methods.handleSubmit(handleSubmit)}
						>
							Сохранить
						</Button>
					</DrawerFooter>
				</FormProvider>
			</DrawerContent>
		</Drawer>
	)
}
