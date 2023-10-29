import { useStore } from 'effector-react'
import {
	$currentPage,
	$pages,
	createPage,
	deletePage,
	openPage,
} from '../../model'

import {
	AccordionComponent,
	AccordionItemComponentProps,
} from '../ui/accordion'
import { useMemo } from 'react'

export const PagesComponent = () => {
	const pages = useStore($pages)
	const currentPage = useStore($currentPage)

	const list = useMemo(() => {
		return pages.map(
			x =>
				({
					name: x.name,
					id: x.id,
					isActive: currentPage?.id === x.id,
					onClick: () => openPage(x),
					onDelete: () => deletePage(x),
					// onEdit: () => {},
				} as AccordionItemComponentProps)
		)
	}, [currentPage?.id, pages])

	return (
		<AccordionComponent title="Pages" list={list} onAdd={() => createPage()} />
	)
}
