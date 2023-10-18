import { AllNodeType, NodesType } from './types'
import { concatText, getStepValues, getTemplateValue } from '../../model/utils'
import { Edge } from 'reactflow'

type Data = { nodes: NodesType; edges: Edge[] }

export const generatePrompts = (
	data: Data,
	settings: { count: number }
): string => {
	let finalPrompt = ''
	console.log(data)
	for (let i = 0; i < (Number(settings.count) || 1); i++) {
		let prompt = [] as string[]
		prompt = generate(data, prompt)

		finalPrompt += concatText(prompt) + '\n'
	}

	return finalPrompt

	function generate(data: Data, prompt: string[], node_?: AllNodeType) {
		const { nodes, edges } = data
		const node = node_ || nodes.find(x => x.type === 'StartNode')!
		const edge = edges.find(e => e.source === node.id)

		let nextNode = nodes.find(x => x.id === edge?.target)

		if (node.type === 'SimpleNode') {
			prompt = prompt.concat(getStepValues(node.data))
		}
		if (node.type === 'BranchNode') {
			const branch = getStepValues(node.data)
			const targetEdge = edges.find(
				x => x.sourceHandle === `${node.id}-${branch}`
			)?.target
			console.log(
				nodes,
				branch,
				edges.find(x => x.sourceHandle === `${node.id}-${branch}`),
				targetEdge
			)
			nextNode = nodes.find(x => x.id === targetEdge)
		}
		if (node.type === 'TemplateNode') {
			prompt = prompt.concat(getTemplateValue(node.data))
		}

		// console.log(node, edge, nextNode)

		if (!node || !edge || !nextNode) return prompt
		prompt = generate(data, prompt, nextNode)

		return prompt
	}
}
