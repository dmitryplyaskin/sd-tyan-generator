import { BranchNode } from './branch-node'
import { SimpleNode } from './simple-node'
import { StartNode } from './start'
import { TemplateNode } from './template-node'

export const nodeTypes = {
	StartNode: StartNode,
	SimpleNode: SimpleNode,
	BranchNode: BranchNode,
	TemplateNode: TemplateNode,
}
