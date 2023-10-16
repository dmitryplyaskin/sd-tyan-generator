import { Edge, Node } from 'reactflow'
import {
	SimpleStepInterface,
	BranchStepInterface,
	TemplateStepInterface,
} from '../../types'

export type SimpleNodeType = Node<SimpleStepInterface, 'SimpleNode'>
export type BranchNodeType = Node<BranchStepInterface, 'BranchNode'>
export type TemplateNodeType = Node<TemplateStepInterface, 'TemplateNode'>
export type StartNodeType = Node<unknown, 'StartNode'>

export type AllNodeType =
	| SimpleNodeType
	| BranchNodeType
	| TemplateNodeType
	| StartNodeType

export type EditableNodeType =
	| SimpleNodeType
	| BranchNodeType
	| TemplateNodeType

export type NodesType = AllNodeType[]

export type TemplateType = {
	id: number
	name: string
	nodes: AllNodeType[]
	edges: Edge[]
}
