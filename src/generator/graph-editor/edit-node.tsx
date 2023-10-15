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
import { BranchNodeForm } from './edit-node-form/branch'
import { TemplateNodeForm } from './edit-node-form/template'

export const EditNode = () => {
	const { isOpen } = useStore($editNode)
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
						<Stack spacing="4">
							{currentNode && currentNode.type === 'SimpleNode' && (
								<SimpleNodeForm {...currentNode} />
							)}
							{currentNode && currentNode.type === 'BranchNode' && (
								<BranchNodeForm {...currentNode} />
							)}
							{currentNode && currentNode.type === 'TemplateNode' && (
								<TemplateNodeForm {...currentNode} />
							)}
						</Stack>
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
