import { useFormContext } from 'react-hook-form'
import {
	NameInput,
	OptionalChanceInput,
	RangeInput,
	ValueInput,
} from './_inputs_'
import { useEffect } from 'react'
import { TemplateNodeType } from '../model/types'
import { inputFormatTextAreaFormat } from '../../components/utils'

export const TemplateNodeForm = ({ data }: TemplateNodeType) => {
	const { reset } = useFormContext()

	useEffect(() => {
		reset({
			...data,
			templates: {
				type: data.templates.type,
				data: inputFormatTextAreaFormat(data.templates),
			},
		})
	}, [])

	return (
		<>
			<NameInput />
			<ValueInput name="templates" />
			<OptionalChanceInput />
			<RangeInput />
		</>
	)
}
