import { $nodeData } from '../generator/graph-editor/model'

export const saveDataAsJSONFile = () => {
	const data = $nodeData.getState()
	const id = new Date().getTime()

	const json = JSON.stringify({ ...data, id: id, name: id })
	const blob = new Blob([json], { type: 'application/json' })

	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')

	link.href = url
	link.download = `${id}.json`

	link.click()

	URL.revokeObjectURL(url)
}
