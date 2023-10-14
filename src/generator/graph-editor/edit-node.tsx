import { useStore } from 'effector-react/effector-react.mjs'
import { $currentEditNode, $editNode, closeEditNode } from './model/edit-node'
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Stack,
} from '@chakra-ui/react'
import React from 'react'

export const EditNode = () => {
	const { isOpen } = useStore($editNode)
	const currentNode = useStore($currentEditNode)
	const btnRef = React.useRef<any>()

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={closeEditNode}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent maxW={'700px'}>
				<DrawerCloseButton />

				<DrawerHeader>Настройки {currentNode?.data.name}</DrawerHeader>

				<DrawerBody>
					<Stack spacing={'4'}>123</Stack>
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={() => closeEditNode()}>
						Отменить
					</Button>
					<Button colorScheme="blue" onClick={() => {}}>
						Сохранить
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
