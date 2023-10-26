import { useFormContext } from 'react-hook-form'
import {
	NameInput,
	OptionalChanceInput,
	RangeInput,
	ValueInput,
} from './_inputs_'
import { useEffect } from 'react'
import { SimpleNodeType } from '../../../../model/types'
import { inputFormatTextAreaFormat } from '../../model/utils/format-value'

export const SimpleNodeForm = ({ data }: SimpleNodeType) => {
	const { reset } = useFormContext()

	useEffect(() => {
		reset({
			...data,
			values: {
				type: data.values.type,
				data: inputFormatTextAreaFormat(data.values),
			},
		})
	}, [])

	return (
		<>
			<NameInput />
			<ValueInput />
			<OptionalChanceInput />
			<RangeInput />
		</>
	)
}
