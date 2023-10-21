import React, { useEffect, useState } from 'react'
import { OnInit, XYPosition } from 'reactflow'

export const useMouseSelect = (
	reactFlowWrapper: React.MutableRefObject<HTMLDivElement | null>,
	reactFlowInstance: OnInit<any, any> | null
) => {
	const [init, setInit] = useState(false)
	const [startMove, setStartMove] = useState(false)
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
	const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
	useEffect(() => {
		const timeout = setTimeout(() => {
			setInit(true)
		}, 200)

		return () => clearTimeout(timeout)
	}, [])

	useEffect(() => {
		if (!init) return
		// const div = ref.current!
		const div = document.querySelector('.react-flow__pane')!
		const selectArea = document.querySelector('.select_area')!

		const onMouseDown = (event: Event) => {
			if (!event.ctrlKey) return
			const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect()

			const position = reactFlowInstance?.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			}) as XYPosition
			setStartMove(true)
			setStartPosition(position)
			console.log(position)
			console.log(selectArea.style)
			selectArea.style = `position: absolute; z-index: 15; width: 0px; height: 0px; background-color: rgba(0, 0, 0, 0.5); transform: translate(${position.x}px, ${position.y}px)`
		}

		const onMouseMove = (event: Event) => {
			if (event.buttons !== 1) return
			if (startMove) {
				const reactFlowBounds =
					reactFlowWrapper.current!.getBoundingClientRect()

				const position = reactFlowInstance?.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				}) as XYPosition
				setCurrentPosition(position)
			}
		}
		const onMouseUp = (event: Event) => {
			setStartMove(false)
		}

		div.addEventListener('mousedown', onMouseDown)
		div.addEventListener('mousemove', onMouseMove)
		div.addEventListener('mouseup', onMouseUp)
		return () => {
			div.removeEventListener('mousedown', onMouseDown)
			div.removeEventListener('mousemove', onMouseMove)
			div.removeEventListener('mouseup', onMouseUp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [init, reactFlowInstance, startMove])

	useEffect(() => {
		if (!init) return
		const div = document.querySelector('.react-flow__nodes')!
		div.insertAdjacentHTML(
			'beforeend',
			`<div class="select_area" style="position: absolute; z-index: 15; width: 300px; height: 300px; background-color: rgba(0, 0, 0, 0.5); z-index: 10"></div>`
		)

		return () => {}
	}, [init])

	const obj = {
		xFrom: startPosition.x,
		xTo: currentPosition.x,
		yFrom: startPosition.y,
		yTo: currentPosition.y,
	}

	return () => (
		<div
			style={{
				background: 'red',
				opacity: '0.6',
				position: 'absolute',
				zIndex: 15,
				transform: `translate(${obj.xFrom}, ${obj.yFrom})`,
				left: 0,
				top: 0,
				width: obj.xTo - obj.xFrom,
				height: obj.yTo - obj.yFrom,
			}}
		></div>
	)
}
