import { XYPosition } from 'reactflow'
import { EditableNodeType, NodeNameType } from '../model/types'
import { $nodesCount } from '../model'

export const createNode = (type: NodeNameType, position: XYPosition) => {
	const id = `${$nodesCount.getState() + 1}`

	const newNode = {
		id,
		type,
		position,
	} as EditableNodeType

	if (type === NodeNameType.SimpleNode) {
		newNode.data = {
			name: `${type}`,
			values: {
				type: 'default',
				data: ['value1', 'value2'],
			},
			optional: { isOptional: false, value: 0.5 },
			range: { isRange: false, value: [1, 2] },
		}
	}
	if (type === NodeNameType.BranchNode) {
		newNode.data = {
			name: `${type}`,
			values: {
				type: 'default',
				data: ['branch-1', 'branch-2'],
			},
			optional: { isOptional: false, value: 0.5 },
			range: { isRange: false, value: [1, 2] },
		}
	}
	if (type === NodeNameType.TemplateNode) {
		newNode.data = {
			name: `${type}`,
			templates: {
				type: 'default',
				data: ['${key1} is ${key3}', '${key2}'],
			},
			keys: {
				['key1']: {
					type: 'default',
					data: ['value1', 'value2'],
				},
				['key2']: {
					type: 'weight',
					data: {
						value1: 10,
						value2: 30,
					},
				},
			},
			optional: { isOptional: false, value: 0.5 },
			range: { isRange: false, value: [1, 2] },
		}
	}

	return newNode
}
