import { createStore, createEvent, combine } from 'effector'
import { EditableNodeType } from './types'
import { $nodes } from './index'

type EditNodeType = {
	isOpen: boolean
	type: EditableNodeType['type']
	id: string
}

export const $editNode = createStore<EditNodeType>({
	isOpen: false,
	type: 'SimpleNode',
	id: '',
})

export const $currentEditNode = combine(
	$editNode,
	$nodes,
	({ type }, nodes) => nodes.find(x => x.type === type) as EditableNodeType
)

export const openEditNode = createEvent<EditNodeType>()
export const closeEditNode = createEvent()

$editNode
	.on(openEditNode, (_, data) => data)
	.on(closeEditNode, state => ({ ...state, isOpen: false }))
