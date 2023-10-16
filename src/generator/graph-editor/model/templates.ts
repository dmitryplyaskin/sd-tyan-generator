import { createStore, createEvent } from 'effector'
import { TemplateType } from './types'

import persist from 'effector-localstorage'

export const $templates = createStore<TemplateType[]>([])
export const loadTemplate = createEvent<TemplateType>()

$templates.on(loadTemplate, (state, template) => [...state, template])

export const $activeTemplate = createStore<TemplateType | null>(null)
export const selectTemplate = createEvent<TemplateType>()

$activeTemplate.on(selectTemplate, (_, template) => template)

persist({ store: $templates, key: 'templates' })
