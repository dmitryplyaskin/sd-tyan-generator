import { useStore } from 'effector-react'
import {
	$currentPage,
	$pages,
	createPage,
	deletePage,
	openEditPage,
	openPage,
} from '../../model'

import {
	AccordionComponent,
	AccordionItemComponentProps,
} from '../ui/accordion'
import { useMemo } from 'react'
import { EditPage } from '../../generator/graph-editor/components/edit-page'

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
					onEdit: () => openEditPage(x),
				} as AccordionItemComponentProps)
		)
	}, [currentPage?.id, pages])

	return (
		<>
			<AccordionComponent
				title="Pages"
				list={list}
				onAdd={() => createPage()}
			/>
			<EditPage />
		</>
	)
}
