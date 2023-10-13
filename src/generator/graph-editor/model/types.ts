import { Node } from 'reactflow'
import {
	SimpleStepInterface,
	BranchStepInterface,
	TemplateStepInterface,
} from '../../types'

export type SimpleNodeType = Node<SimpleStepInterface, 'SimpleNode'>
export type BranchNodeType = Node<BranchStepInterface, 'BranchNode'>
export type TemplateNodeType = Node<TemplateStepInterface, 'TemplateNode'>
export type StartNodeType = Node<unknown, 'StartNode'>

export type NodeType =
	| SimpleNodeType
	| BranchNodeType
	| TemplateNodeType
	| StartNodeType

export type NodesType = NodeType[]
