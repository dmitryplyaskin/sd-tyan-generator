/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { SimpleNodeForm } from './components/edit-node-form/simple'
import { BranchNodeForm } from './components/edit-node-form/branch'
import { TemplateNodeForm } from './components/edit-node-form/template'
import { changeBranchType, changeSimpleType, changeTemplateType } from './model'
import { outputFormatTextAreaFormat } from './model/utils/format-value'
import { NodeNameType } from './model/types'

export const EditNode = () => {
	const { isOpen } = useStore($editNode)
	const currentNode = useStore($currentEditNode)
	const btnRef = React.useRef<any>()
	const methods = useForm()

	const handleSubmit = (v: any) => {
		if (currentNode.type === NodeNameType.SimpleNode) {
			changeSimpleType({
				...currentNode,
				data: {
					...v,
					values: {
						type: v.values.type,
						data: outputFormatTextAreaFormat(v.values.data, v.values.type),
					},
				},
			})
		}
		if (currentNode.type === NodeNameType.BranchNode) {
			changeBranchType({
				...currentNode,
				data: {
					...v,
					values: {
						type: v.values.type,
						data: outputFormatTextAreaFormat(v.values.data, v.values.type),
					},
				},
			})
		}
		if (currentNode.type === NodeNameType.TemplateNode) {
			changeTemplateType({
				...currentNode,
				data: {
					...v,
					templates: {
						type: v.templates.type,
						data: outputFormatTextAreaFormat(
							v.templates.data,
							v.templates.type
						),
					},
					keys: Object.entries(v.keys).reduce((acc, [key, value]) => {
						return {
							...acc,
							[key]: {
								// @ts-expect-error
								type: value.type,
								// @ts-expect-error
								data: outputFormatTextAreaFormat(value.data, value.type),
							},
						}
					}, {}),
				},
			})
		}

		closeEditNode()
	}

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
