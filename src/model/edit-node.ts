import { createStore, createEvent, combine } from 'effector'
import { EditableNodeType, NodeNameType } from './types'
import { $currentNodes } from '.'

type EditNodeType = {
	isOpen: boolean
	type: EditableNodeType['type']
	id: string
}

export const $editNode = createStore<EditNodeType>({
	isOpen: false,
	type: NodeNameType.SimpleNode,
	id: '',
})

export const $currentEditNode = combine(
	$editNode,
	$currentNodes,
	({ id }, nodes) => nodes.find(x => x.id === id) as EditableNodeType
)

export const openEditNode = createEvent<EditNodeType>()
export const closeEditNode = createEvent()

$editNode
	.on(openEditNode, (_, data) => data)
	.on(closeEditNode, state => ({ ...state, isOpen: false }))
