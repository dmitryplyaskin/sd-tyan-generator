import { Node } from 'reactflow'
import {
	BranchStepInterface,
	StepWithValuesType,
	TemplateStepInterface,
	ValuesType,
} from '../../../../model/types'

const getRandomIntInclusive = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const concatText = (array: string[]) => array.filter(x => x).join(', ')
export const getOneParam = (array: string[]) =>
	array[getRandomIntInclusive(0, array.length - 1)]

export const getRandomParams = (
	arr: string[],
	range: [min: number, max: number]
) => {
	const shuffled = [...arr].sort(() => 0.5 - Math.random())
	const count = getRandomIntInclusive(range[0], range[1])
	return shuffled.slice(0, count)
}

export const randomBoolean = (weight = 0.5) => {
	return Math.random() < weight
}

export const optionalParam = (result: string[], wight = 0.5) => {
	const condition = randomBoolean(wight)

	if (condition) return result
	return [] as string[]
}

export const arraysIntersect = (
	arr: string[],
	obj: { [key: string]: string[] }
) => {
	return Object.values(obj).some(subArr => {
		return subArr.some(value => arr.includes(value))
	})
}

export const weightedRandom = (odds: { [key: string]: number }) => {
	let sum = 0
	for (const key in odds) {
		sum += odds[key]
	}

	let random = Math.floor(Math.random() * sum) + 1

	for (const key in odds) {
		random -= odds[key]
		if (random <= 0) return key
	}

	return ''
}

export const weightedRandomMultiple = (
	odds: {
		[key: string]: number
	},
	countRange: [min: number, max: number]
): string[] => {
	type WeightItem = {
		value: string
		weight: number
	}

	const weights: WeightItem[] = []
	let sum = 0

	for (const key in odds) {
		sum += odds[key]
		weights.push({ value: key, weight: odds[key] })
	}

	const results: string[] = []
	const [min, max] = countRange
	const count = Math.floor(Math.random() * (max - min + 1)) + min

	const used: Record<string, boolean> = {}

	for (let i = 0; i < count; i++) {
		let randomValue = ''

		do {
			let random = Math.floor(Math.random() * sum) + 1

			for (const weight of weights) {
				random -= weight.weight
				if (random <= 0) {
					randomValue = weight.value
					break
				}
			}
		} while (used[randomValue])

		used[randomValue] = true
		results.push(randomValue)
	}

	return results
}

export const getStepValues = <T extends StepWithValuesType>(data: T) => {
	let arr = [] as string[]

	if (data.range?.isRange) {
		arr =
			data.values.type === 'default'
				? getRandomParams(data.values.data, data.range.value)
				: weightedRandomMultiple(data.values.data, data.range.value)
	} else {
		arr.push(
			data.values.type === 'default'
				? getOneParam(data.values.data)
				: weightedRandom(data.values.data)
		)
	}

	if (data.optional?.isOptional) return optionalParam(arr, data.optional.value)
	return arr
}
export const getStepValuesBranch = (data: BranchStepInterface) => {
	const disabledBranches = data.disabled || []
	const values = { ...data.values }
	if (values.type === 'default') {
		values.data = values.data.filter(x => !disabledBranches.includes(x))
	} else {
		values.data = { ...values.data }
		disabledBranches.forEach(x => {
			delete values.data[x]
		})
	}

	return getStepValues({ ...data, values })
}
export const getValues = (
	data: ValuesType,
	range?: { isRange: boolean; value: [min: number, max: number] }
) => {
	let arr = [] as string[]

	if (range?.isRange) {
		arr =
			data.type === 'default'
				? getRandomParams(data.data, range.value || [1, 1])
				: weightedRandomMultiple(data.data, range.value || [1, 1])
	} else {
		arr.push(
			data.type === 'default'
				? getOneParam(data.data)
				: weightedRandom(data.data)
		)
	}

	return arr
}

// export const metaValidator = <T extends StepType>(
// 	data: T,
// 	meta: MetaData,
// 	fn: () => string[]
// ) => {
// 	// @ts-expect-error
// 	const checkTarget = Boolean(Object.entries(data.targetTags).length)
// 	// @ts-expect-error
// 	const metaKeys = Object.keys(data.targetTags)
// 	const metaArray = metaKeys.reduce((a, c) => a.concat(meta[c]), [] as string[])
// 	// @ts-expect-error
// 	if (checkTarget && !arraysIntersect(metaArray, data.targetTags)) {
// 		return []
// 	}
// 	return fn()
// }

export const getTemplateValue = (data: TemplateStepInterface) => {
	const value = getValues(data.templates, data.range)

	const replaced = value
		.map(str => ({
			originalStr: str,
			matches: str.match(/\${(.+?)}/g),
		}))
		.map(x => {
			let str = x.originalStr
			for (const match of x.matches || []) {
				const key = match.replace(/\${(.+?)}/g, '$1')
				const value = getValues(data.keys[key] || {})[0]
				str = str.replace(match, value)
			}

			return str
		})

	return replaced
}

export const uniqueBy = (arr: Node[], key: keyof Node) => {
	const seen = new Set()

	return arr.filter(item => {
		const k = item[key]
		return seen.has(k) ? false : seen.add(k)
	})
}
