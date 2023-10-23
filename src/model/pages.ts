import { createEvent, createStore } from 'effector'
import { PageType } from '../generator/graph-editor/model/types'
import persist from 'effector-localstorage'

export const $activePages = createStore<PageType[]>([])
export const openPage = createEvent<PageType>()
export const closePage = createEvent<PageType>()

$activePages
	.on(openPage, (state, page) => [...state, page])
	.on(closePage, (state, page) => state.filter(x => x.id !== page.id))

export const $currentPage = createStore<PageType | null>(null)

$currentPage
	.on(openPage, (_, page) => page)
	.on(closePage, (state, page) => (state?.id === page.id ? null : state))

persist({ store: $activePages, key: 'activePages' })
persist({ store: $currentPage, key: 'currentPage' })
