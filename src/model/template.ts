import { createEvent, createStore } from 'effector'
import { PageType, TemplateType } from '../generator/graph-editor/model/types'
import persist from 'effector-localstorage'

const defaultTemplate: TemplateType = {
	id: new Date().getTime(),
	name: 'default template',
	nodes: [],
	edges: [],
	pages: [],
	functions: [],
	globalVars: [],
}

export const $template = createStore<TemplateType>(defaultTemplate)
export const loadTemplate = createEvent<TemplateType>()
export const clearTemplate = createEvent()

$template
	.on(loadTemplate, (_, template) => template)
	.on(clearTemplate, () => {})

export const createPage = createEvent()
export const updatePage = createEvent<PageType>()
export const deletePage = createEvent<PageType>()

$template
	.on(createPage, state => ({
		...state,
		pages: [
			{ id: new Date().getTime(), name: 'new page', nodes: [], edges: [] },
			...state.pages,
		],
	}))
	.on(updatePage, (state, page) => ({
		...state,
		pages: state.pages.map(x => (x.id === page.id ? page : x)),
	}))
	.on(deletePage, (state, page) => ({
		...state,
		pages: state.pages.filter(x => x.id !== page.id),
	}))

persist({ store: $template, key: 'template' })
