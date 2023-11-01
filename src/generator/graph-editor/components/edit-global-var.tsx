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
import {
	$editGlobalVar,
	closeEditGlobalVar,
	saveEditGlobalVar,
} from '../../../model/global-vars'
import { useStore } from 'effector-react'
import { NameInput, ValueInput } from './edit-node-form/_inputs_'
import {
	inputFormatTextAreaFormat,
	outputFormatTextAreaFormat,
} from '../../../model/utils/format-value'

export const EditGlobalVar = () => {
	const { isOpen, data } = useStore($editGlobalVar)
	const btnRef = React.useRef<any>()
	const methods = useForm()

	useEffect(() => {
		if (isOpen) {
			methods.reset({
				...data,
				values: {
					type: data.values.type,
					data: inputFormatTextAreaFormat(data.values),
				},
			})
		}
	}, [isOpen])

	const handleSubmit = (v: any) => {
		saveEditGlobalVar({
			...v,
			values: {
				type: v.values.type,
				data: outputFormatTextAreaFormat(v.values.data, v.values.type),
			},
		})
	}

	return (
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={() => closeEditGlobalVar()}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent maxW={'700px'}>
				<FormProvider {...methods}>
					<DrawerCloseButton />

					<DrawerHeader>Переменная {data.name}</DrawerHeader>

					<DrawerBody>
						<Stack spacing="4">
							<NameInput />
							<ValueInput />
						</Stack>
					</DrawerBody>

					<DrawerFooter>
						<Button
							variant="outline"
							mr={3}
							onClick={() => closeEditGlobalVar()}
						>
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
