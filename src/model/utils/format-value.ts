import { ValuesFormatType, ValuesType, WeightValueType } from '../types'

export const inputFormatTextAreaFormat = ({ data, type }: ValuesType) => {
	if (type === 'default') {
		return data.join('\n')
	}

	return Object.entries(data)
		.map(([key, value]) => {
			return `${key}: ${value}`
		})
		.join('\n')
}
export const outputFormatTextAreaFormat = (
	data: string,
	type: ValuesFormatType
) => {
	if (type === 'default') {
		return data.split('\n').filter(x => x)
	}

	return data
		.split('\n')
		.map(x => {
			const index = x.lastIndexOf(':')
			return [x.slice(0, index), Number(x.slice(index + 1))]
		})
		.reduce((a, c) => ({ ...a, [c[0]]: c[1] }), {} as WeightValueType)
}
