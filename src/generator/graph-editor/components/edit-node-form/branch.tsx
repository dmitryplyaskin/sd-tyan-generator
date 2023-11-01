import { useFormContext } from 'react-hook-form'
import { NameInput, ValueInput } from './_inputs_'
import { useEffect } from 'react'
import { BranchNodeType } from '../../../../model/types'
import { inputFormatTextAreaFormat } from '../../../../model/utils/format-value'

export const BranchNodeForm = ({ data }: BranchNodeType) => {
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
		</>
	)
}
