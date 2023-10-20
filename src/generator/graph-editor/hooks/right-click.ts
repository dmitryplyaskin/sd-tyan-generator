import React from 'react'

export const useRightClick = (
	ref: React.MutableRefObject<HTMLDivElement | null>
) => {
	const onContextMenu = (event: MouseEvent) => {
		event.preventDefault()
	}

	React.useEffect(() => {
		const div = ref.current!
		div.addEventListener('contextmenu', onContextMenu)

		return () => {
			div.removeEventListener('contextmenu', onContextMenu)
		}
	})
}
