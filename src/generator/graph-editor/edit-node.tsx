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
import { FormProvider, useForm } from 'react-hook-form'
import { SimpleNodeForm } from './edit-node-form/simple'

export const EditNode = () => {
	const { isOpen, type } = useStore($editNode)
	const currentNode = useStore($currentEditNode)
	const btnRef = React.useRef<any>()
	const methods = useForm()

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={closeEditNode}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent maxW={'700px'}>
				<FormProvider {...methods}>
					<DrawerCloseButton />

					<DrawerHeader>Настройки {currentNode?.data.name}</DrawerHeader>

					<DrawerBody>
						{currentNode.type === 'SimpleNode' && (
							<SimpleNodeForm {...currentNode} />
						)}
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={() => closeEditNode()}>
							Отменить
						</Button>
						<Button colorScheme="blue" onClick={() => {}}>
							Сохранить
						</Button>
					</DrawerFooter>
				</FormProvider>
			</DrawerContent>
		</Drawer>
	)
}
