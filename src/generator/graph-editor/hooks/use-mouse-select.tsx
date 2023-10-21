import { position } from '@chakra-ui/react'
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
			console.log(selectArea)
			selectArea.style.position = `absolute`
			selectArea.style.zIndex = `15`
			selectArea.style.width = `0px`
			selectArea.style.height = `0px`
			selectArea.style.backgroundColor = `rgba(0, 0, 0, 0.5)`
			selectArea.style.transform = `translate(${position.x}px, ${position.y}px)`
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

				selectArea.style.width = `${position.x}px`
				selectArea.style.height = `${position.y}px`
				console.log(selectArea.style.width, position)
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
		const div = document.querySelector('.react-flow__nodes')!
		div.insertAdjacentHTML('beforeend', `<div class="select_area"></div>`)

		return () => {}
	}, [])

	const obj = {
		xFrom: startPosition.x,
		xTo: currentPosition.x,
		yFrom: startPosition.y,
		yTo: currentPosition.y,
	}

	return () => (
		<div
		// style={{
		// 	background: 'red',
		// 	opacity: '0.6',
		// 	position: 'absolute',
		// 	zIndex: 15,
		// 	transform: `translate(${obj.xFrom}, ${obj.yFrom})`,
		// 	left: 0,
		// 	top: 0,
		// 	width: obj.xTo - obj.xFrom,
		// 	height: obj.yTo - obj.yFrom,
		// }}
		></div>
	)
}
