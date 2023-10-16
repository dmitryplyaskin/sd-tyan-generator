import { useFormContext } from 'react-hook-form'
import {
	NameInput,
	OptionalChanceInput,
	RangeInput,
	TemplateInput,
	ValueInput,
} from './_inputs_'
import { useEffect } from 'react'
import { TemplateNodeType } from '../model/types'
import { inputFormatTextAreaFormat } from '../../components/utils'

export const TemplateNodeForm = ({ data }: TemplateNodeType) => {
	const { reset } = useFormContext()

	useEffect(() => {
		const keys = Object.entries(data.keys)
			.map(x => ({
				[x[0]]: {
					type: x[1].type || 'default',
					data: inputFormatTextAreaFormat(x[1]),
				},
			}))
			.reduce((a, c) => ({ ...a, ...c }), {})
		reset({
			...data,
			templates: {
				type: data.templates.type,
				data: inputFormatTextAreaFormat(data.templates),
			},
			keys,
		})
	}, [])

	return (
		<>
			<NameInput />
			<ValueInput name="templates" />
			<TemplateInput />
			<OptionalChanceInput />
			<RangeInput />
		</>
	)
}
