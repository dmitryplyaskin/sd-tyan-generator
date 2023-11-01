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
import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import {} from '../../../model/global-vars'
import { useStore } from 'effector-react'
import { NameInput } from './edit-node-form/_inputs_'
import { $editPage, closeEditPage, saveEditPage } from '../../../model'

export const EditPage = () => {
	const { isOpen, data } = useStore($editPage)
	const btnRef = React.useRef<any>()
	const methods = useForm()

	useEffect(() => {
		if (isOpen) {
			methods.reset({
				...data,
			})
		}
	}, [isOpen])

	const handleSubmit = (v: any) => {
		saveEditPage({
			...v,
		})
	}

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={() => closeEditPage()}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent maxW={'700px'}>
				<FormProvider {...methods}>
					<DrawerCloseButton />

					<DrawerHeader>Page: {data.name}</DrawerHeader>

					<DrawerBody>
						<Stack spacing="4">
							<NameInput />
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={() => closeEditPage()}>
							Cancel
						</Button>
						<Button
							colorScheme="blue"
							onClick={methods.handleSubmit(handleSubmit)}
						>
							Save
						</Button>
					</DrawerFooter>
				</FormProvider>
			</DrawerContent>
		</Drawer>
	)
}
