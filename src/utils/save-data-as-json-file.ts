import { $template } from '../model'

export const saveDataAsJSONFile = () => {
	const data = $template.getState()

	const json = JSON.stringify(data)
	const blob = new Blob([json], { type: 'application/json' })

	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')

	link.href = url
	link.download = `sd-tyan-generator-template.json`

	link.click()

	URL.revokeObjectURL(url)
}
