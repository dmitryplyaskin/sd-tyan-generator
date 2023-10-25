import { Edge } from 'reactflow'
import { AllNodeType, PageType } from '../../generator/graph-editor/model/types'

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
