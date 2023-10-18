/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createEvent, createStore, sample } from 'effector'

import {
	GenerationSettings,
	PipelineSteps,
	SimpleStepInterface,
	BranchStepInterface,
	GroupBranchStepInterface,
	TagObject,
	StepType,
	PresetTemplateFileType,
} from '../types'
import { promptGenerator } from './generate'

export const $templates = createStore<PresetTemplateFileType[]>([])
export const initTemplates = createEvent<PresetTemplateFileType[]>()
export const loadTemplate = createEvent<PresetTemplateFileType>()

$templates
	.on(initTemplates, (_, data) => data)
	.on(loadTemplate, (state, template) => [...state, template])

export const $activeTemplate = createStore({} as PresetTemplateFileType)
export const selectTemplate = createEvent<PresetTemplateFileType>()
$activeTemplate.on(selectTemplate, (_, template) => template)

export const $generatorState = createStore<PipelineSteps>([])
export const uploadGenerator = createEvent<PipelineSteps>()
export const changeSimpleType = createEvent<SimpleStepInterface>()
export const changeBranchType = createEvent<BranchStepInterface>()
export const changeGroupBranchType = createEvent<GroupBranchStepInterface>()
export const setGeneratorState = createEvent<PipelineSteps>()

const setNewState = (state: PipelineSteps, data: StepType): PipelineSteps => {
	return state.map(x => {
		// @ts-expect-error
		if (x.id !== data.id) {
			if (x.type === 'GroupBranchStep') {
				return { ...x, render: setNewState(x.render, data) }
			}
			return x
		}
		return { ...x, ...data }
	})
}

$generatorState
	.on([changeSimpleType, changeBranchType, changeGroupBranchType], setNewState)
	.on(setGeneratorState, (_, data) => data)
	.on(uploadGenerator, (_, data) => data)
	.on($activeTemplate, (_, data) => data.template)

export const $tagList = $generatorState.map(x =>
	x
		.filter((x): x is BranchStepInterface | GroupBranchStepInterface =>
			['BranchStep', 'GroupBranchStep'].includes(x.type)
		)
		.reduce(
			(a, c) => ({
				...a,
				// @ts-expect-error
				[c.id]:
					c.values.type === 'default'
						? c.values.data
						: Object.keys(c.values.data),
			}),
			{} as TagObject
		)
)

export const $generateResult = createStore('')
export const generateCore = createEvent<{
	data: PipelineSteps
	settings: GenerationSettings
}>()
export const generate = createEvent<GenerationSettings>()

$generateResult.on(generateCore, (_, data) => promptGenerator(data))

sample({
	source: $generatorState,
	clock: generate,
	fn: (data, settings) => ({ data, settings }),
	target: generateCore,
})
