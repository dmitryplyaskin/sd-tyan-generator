import React, { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	Input,
	MenuDivider,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
} from '@chakra-ui/react'

import { saveDataAsJSONFile } from '../../../utils/save-data-as-json-file'

import { loadTemplate, resetAllNodesAndEdges, resetEdges } from '../../../model'

export const EditorMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [currentAlertState, setCurrentAlertState] = useState<AlertTextType>(
		alertTexts['delete-edges']
	)

	const handleFileChange = (e: any) => {
		const file = e.target.files[0]

		const reader = new FileReader()

		reader.onload = () => {
			const text = reader.result as string
			loadTemplate(JSON.parse(text))
		}

		reader.readAsText(file)
	}

	const openAlert = (type: AlertType) => {
		setCurrentAlertState(alertTexts[type])
		onOpen()
	}

	const onSubmit = (type: AlertType) => {
		if (type === 'delete-edges') {
			resetEdges()
		} else if (type === 'delete-nodes-and-edges') {
			resetAllNodesAndEdges()
		}
		// else if (type === 'delete-templates') {
		// 	clearTemplates()
		// }
		onClose()
	}

	return (
		<>
			<MenuAlert
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={onSubmit}
				text={currentAlertState}
			/>
			<Box position="absolute" top="2" right="2" zIndex={11}>
				<Input type="file" hidden id="fileUpload" onChange={handleFileChange} />
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
						Действия
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => document.getElementById('fileUpload')?.click()}
						>
							Загрузить
						</MenuItem>
						<MenuItem onClick={() => saveDataAsJSONFile()}>Скачать</MenuItem>
						{/* <MenuItem onClick={() => duplicateTemplate()}>Дублировать</MenuItem> */}
						<MenuDivider />
						<MenuItem color="red" onClick={() => openAlert('delete-edges')}>
							Удалить связи
						</MenuItem>
						<MenuItem
							color="red"
							onClick={() => openAlert('delete-nodes-and-edges')}
						>
							Удалить ноды и связи
						</MenuItem>
						{/* <MenuItem color="red" onClick={() => openAlert('delete-templates')}>
							Удалить все теплейты
						</MenuItem> */}
					</MenuList>
				</Menu>
			</Box>
		</>
	)
}
type MenuAlertProps = {
	isOpen: boolean
	onClose: () => void
	onSubmit: (type: AlertType) => void
	text: AlertTextType
}

const MenuAlert: React.FC<MenuAlertProps> = ({
	onClose,
	onSubmit,
	isOpen,
	text,
}) => {
	const cancelRef = React.useRef<HTMLButtonElement | null>(null)

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{text.title}
					</AlertDialogHeader>

					<AlertDialogBody>{text.description}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Отменить
						</Button>
						<Button
							colorScheme="red"
							onClick={() => onSubmit(text.type)}
							ml={3}
						>
							Удалить
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

const alertTexts = {
	'delete-edges': {
		type: 'delete-edges' as const,
		title: 'Удалить связи?',
		description:
			'Будут удалены все связи на странице (помогает, в случае возникновения бага со связями, для повтороного их переподключения)',
	},
	'delete-nodes-and-edges': {
		type: 'delete-nodes-and-edges' as const,
		title: 'Удалить ноды и связи?',
		description: 'Будут удалены все ноды и связи на странице',
	},
	'delete-templates': {
		type: 'delete-templates' as const,
		title: 'Удалить темлейты?',
		description:
			'Будут удалены все загруженные темплейты на странице (темплейт в редакторе не будет удален, но если его не сохранить, он будет утерян)',
	},
}

type AlertType = keyof typeof alertTexts
type AlertTextType = {
	type: AlertType
	title: string
	description: string
}
