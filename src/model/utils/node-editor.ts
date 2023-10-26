import { Edge } from 'reactflow'
import { AllNodeType, NodeNameType, PageType } from '../types'

export const changeNodes =
	<T>(fn: (state: AllNodeType[], data: T) => AllNodeType[]) =>
	(state: PageType | null, data: T) => {
		if (!state) {
			return state
		}
		return { ...state, nodes: fn(state.nodes, data) }
	}
export const changeEdges =
	<T>(fn: (state: Edge[], data: T) => Edge[]) =>
	(state: PageType | null, data: T) => {
		if (!state) {
			return state
		}
		return { ...state, edges: fn(state.edges, data) }
	}

export const changeNodeData = (state: AllNodeType[], data: AllNodeType) => {
	return state.map(x => {
		if (
			x.id === data.id &&
			x.type === NodeNameType.SimpleNode &&
			data.type === NodeNameType.SimpleNode
		) {
			return { ...x, ...data }
		}

		if (
			x.id === data.id &&
			x.type === NodeNameType.TemplateNode &&
			data.type === NodeNameType.TemplateNode
		) {
			return { ...x, ...data }
		}

		if (
			x.id === data.id &&
			x.type === NodeNameType.BranchNode &&
			data.type === NodeNameType.BranchNode
		) {
			return { ...x, ...data }
		}

		return x
	})
}

export const disableNodeBranch = (
	state: AllNodeType[],
	data: { id: string; disabled: string }
) => {
	return state.map(x => {
		if (x.id === data.id && x.type === 'BranchNode') {
			if (x.data.disabled?.includes(data.disabled)) {
				return {
					...x,
					data: {
						...x.data,
						disabled: x.data.disabled.filter(x => x !== data.disabled),
					},
				}
			}
			return {
				...x,
				data: {
					...x.data,
					disabled: [...(x.data.disabled || []), data.disabled],
				},
			}
		}
		return x
	})
}
