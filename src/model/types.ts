import { Edge, Node } from 'reactflow'

export type RangeType = {
	isRange: boolean
	value: [min: number, max: number]
}
export type OptionalType = {
	isOptional: boolean
	value: number
}

export interface MainStepInterface {
	name: string
	optional?: OptionalType
	range?: RangeType
}

export type CoreValuesType = string[] | { [key: string]: number }
export type ValuesFormatType = 'default' | 'weight'

export type DefaultValueType = {
	data: string[]
	type: 'default'
}
export type WeightValueType = {
	data: { [key: string]: number }
	type: 'weight'
}

export type ValuesType = DefaultValueType | WeightValueType

export interface SimpleStepInterface extends MainStepInterface {
	values: ValuesType
}

export interface BranchStepInterface extends MainStepInterface {
	values: ValuesType
	disabled?: string[]
}

export interface TemplateStepInterface extends MainStepInterface {
	templates: ValuesType
	keys: {
		[key: string]: ValuesType
	}
}

export type StepWithValuesType = SimpleStepInterface | BranchStepInterface

export enum NodeNameType {
	'SimpleNode' = 'SimpleNode',
	'BranchNode' = 'BranchNode',
	'TemplateNode' = 'TemplateNode',
	'StartNode' = 'StartNode',
}

export type SimpleNodeType = Node<SimpleStepInterface, NodeNameType.SimpleNode>
export type BranchNodeType = Node<BranchStepInterface, NodeNameType.BranchNode>
export type TemplateNodeType = Node<
	TemplateStepInterface,
	NodeNameType.TemplateNode
>
export type StartNodeType = Node<unknown, NodeNameType.StartNode>

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

export type GenerationSettings = {
	count: string | number
}

export type GlobalVarType = {
	id: number
	name: string
	values: ValuesType
}

export type PageType = {
	id: number
	name: string
	nodes: AllNodeType[]
	edges: Edge[]
}

export type TemplateType = {
	id: number
	name: string
	nodes: AllNodeType[]
	edges: Edge[]
	pages: PageType[]
	functions: any[]
	globalVariables: GlobalVarType[]
}
