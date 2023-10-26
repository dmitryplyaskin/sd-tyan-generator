/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, createEvent, sample } from 'effector'
import { TemplateType } from '../../../model/types'

import persist from 'effector-localstorage'

export const $templates = createStore<TemplateType[]>([])
export const loadTemplate = createEvent<TemplateType>()
export const clearTemplates = createEvent()

export const $activeTemplate = createStore<TemplateType | null>(null)
export const selectTemplate = createEvent<TemplateType>()
export const firstInit = createEvent()
export const duplicateTemplate = createEvent()

const onDuplicateTemplate = sample({
	source: { active: $activeTemplate, templates: $templates },
	clock: duplicateTemplate,

	fn: ({ active, templates }) =>
		active
			? [
					{
						...active,
						name: active.name + '-duplicate',
						id: new Date().getTime(),
					},
					...templates,
			  ]
			: templates,
})
$templates
	.on(loadTemplate, (state, template) => [template, ...state])
	.on(onDuplicateTemplate, (_, data) => data)
	.on(clearTemplates, () => [])

$activeTemplate
	.on(selectTemplate, (_, template) => template)
	.on(loadTemplate, (_, template) => template)
	.on(onDuplicateTemplate, (_, data) => data[0])
	.on(clearTemplates, () => null)

persist({ store: $templates, key: 'templates' })
persist({ store: $activeTemplate, key: 'activeTemplate' })

sample({
	source: $templates,
	clock: firstInit,
	filter: templates => !!templates.length,
	fn: templates => templates[0],
	target: $activeTemplate,
})

setTimeout(() => {
	firstInit()
}, 200)
