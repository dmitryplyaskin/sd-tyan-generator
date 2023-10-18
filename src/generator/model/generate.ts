/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerationSettings, MetaData, PipelineSteps } from '../types'
import {
	concatText,
	getStepValues,
	getTemplateValue,
	metaValidator,
} from './utils'

export const promptGenerator = (params: {
	data: PipelineSteps
	settings: GenerationSettings
}): string => {
	const { data, settings } = params
	let finalPrompt = ''

	for (let i = 0; i < (Number(settings.count) || 1); i++) {
		const meta = {} as MetaData
		let prompt = [] as string[]
		prompt = generate(data, prompt, meta)

		finalPrompt += concatText(prompt) + '\n'
	}

	return finalPrompt

	function generate(data: PipelineSteps, prompt: string[], meta: MetaData) {
		for (let j = 0; j < data.length; j++) {
			const item = data[j]

			if (item.type === 'SimpleStep') {
				prompt = prompt.concat(getStepValues(item))
			}
			if (item.type === 'TemplateStep') {
				prompt = prompt.concat(getTemplateValue(item))
			}
			if (item.type === 'BranchStep' || item.type === 'GroupBranchStep') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				meta[item.id] = getStepValues(item)
			}

			if (item.type === 'GroupBranchStep') {
				prompt = prompt.concat(
					metaValidator(item, meta, () => generate(item.render, prompt, meta))
				)
			}
		}
		return prompt
	}
}
