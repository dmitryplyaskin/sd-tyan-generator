import { useStoreMap } from 'effector-react'
import { $nodes } from '../model'

export const useSelectedNode = (id: string) => {
	const isSelected = useStoreMap({
		store: $nodes,
		keys: [id],
		fn: (nodes, [key]) => nodes.find(({ id }) => id === key)?.selected,
	})

	return isSelected
}
