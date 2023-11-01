import { createEvent, createStore, sample } from 'effector'
import { NodeNameType, PageType, StartNodeType } from './types'
import persist from 'effector-localstorage'
import { debounce } from 'patronum'
import {
	$template,
	clearTemplate,
	initTemplate,
	loadTemplate,
	updatePages,
} from './template'

const StartNode: StartNodeType = {
	type: NodeNameType.StartNode,
	id: `${new Date().getTime()}`,
	data: null,
	position: { x: 0, y: 0 },
}

export const $pages = createStore<PageType[]>([])

sample({
	source: $template,
	clock: [initTemplate, loadTemplate, clearTemplate],
	fn(src) {
		return src?.pages
	},
	target: $pages,
})

export const createPage = createEvent()
export const updatePage = createEvent<PageType>()
export const deletePage = createEvent<PageType>()
export const savePage = createEvent<PageType | null>()
export const editPage = createEvent<PageType>()
export const duplicatePage = createEvent<PageType>()

$pages
	.on(createPage, state => [
		{
			id: new Date().getTime(),
			name: 'new page',
			nodes: [StartNode],
			edges: [],
		},
		...state,
	])
	.on(updatePage, (state, page) =>
		state.map(x => (x.id === page.id ? page : x))
	)
	.on(deletePage, (state, page) => state.filter(x => x.id !== page.id))
	.on(duplicatePage, (state, page) => [
		{ ...page, name: page.name + '-duplicate', id: new Date().getTime() },
		...state,
	])
	.on(savePage, (state, page) =>
		page ? state.map(x => (x.id === page.id ? page : x)) : state
	)

export const $activePages = createStore<PageType[]>([])
export const openPage = createEvent<PageType>()
export const closePage = createEvent<PageType>()

$activePages
	.on([openPage, duplicatePage], (state, page) => [...state, page])
	.on([closePage, deletePage], (state, page) =>
		state.filter(x => x.id !== page.id)
	)

export const $editPage = createStore({
	isOpen: false,
	data: {} as PageType,
})

export const openEditPage = createEvent<PageType>()
export const saveEditPage = createEvent<PageType>()
export const closeEditPage = createEvent()

$editPage
	.on(openEditPage, (_, data) => ({
		isOpen: true,
		data,
	}))
	.on(saveEditPage, state => ({
		...state,
		isOpen: false,
	}))

sample({ clock: saveEditPage, target: closeEditPage })
sample({ clock: saveEditPage, target: updatePage })

const saveCurrentPages = createEvent<PageType[]>()
const debounced = debounce({
	source: saveCurrentPages,
	timeout: 500,
})

sample({
	clock: $pages,
	target: saveCurrentPages,
})
sample({
	source: $pages,
	clock: [debounced, saveEditPage],
	fn: state => state,
	target: updatePages,
})

persist({ store: $activePages, key: 'activePages' })
