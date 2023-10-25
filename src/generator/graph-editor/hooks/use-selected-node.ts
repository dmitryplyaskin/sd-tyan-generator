import { useStoreMap } from 'effector-react'
import { $currentNodes } from '../../../model'

export const useSelectedNode = (id: string) => {
	const isSelected = useStoreMap({
		store: $currentNodes,
		keys: [id],
		fn: (nodes, [key]) => nodes.find(({ id }) => id === key)?.selected,
	})

	return isSelected
}
