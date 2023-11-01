import { AllNodeType, GlobalVarType, NodesType } from '../types'
import { Edge } from 'reactflow'
import {
	concatText,
	getStepValues,
	getStepValuesBranch,
	getTemplateValue,
} from './common-utils'

type Data = {
	nodeEditor: { nodes: NodesType; edges: Edge[] }
	globalVars: GlobalVarType[]
}

export const generatePrompts = (
	data: Data,
	settings: { count: number }
): string => {
	let finalPrompt = ''

	for (let i = 0; i < (Number(settings.count) || 1); i++) {
		let prompt = [] as string[]
		prompt = generate(data, prompt)

		finalPrompt += concatText(prompt) + '\n'
	}

	return finalPrompt

	function generate(
		{ nodeEditor, globalVars }: Data,
		prompt: string[],
		node_?: AllNodeType
	) {
		const { nodes, edges } = nodeEditor
		const node = node_ || nodes.find(x => x.type === 'StartNode')!
		const edge = edges.find(e => e.source === node.id)

		let nextNode = nodes.find(x => x.id === edge?.target)

		if (node.type === 'SimpleNode') {
			prompt = prompt.concat(getStepValues(node.data))
		}
		if (node.type === 'BranchNode') {
			const branch = getStepValuesBranch(node.data)
			const targetEdge = edges.find(
				x => x.sourceHandle === `${node.id}-${branch}`
			)?.target

			nextNode = nodes.find(x => x.id === targetEdge)
		}
		if (node.type === 'TemplateNode') {
			prompt = prompt.concat(getTemplateValue(node.data, globalVars))
		}

		if (!node || !edge || !nextNode) return prompt
		prompt = generate(data, prompt, nextNode)

		return prompt
	}
}
