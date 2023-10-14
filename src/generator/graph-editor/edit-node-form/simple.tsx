import { useForm, useFormContext } from 'react-hook-form'
import { NameInput } from './_inputs_'
import { useEffect } from 'react'
import { SimpleNodeType } from '../model/types'

export const SimpleNodeForm = ({ data }: SimpleNodeType) => {
	const { control, reset } = useFormContext()

	useEffect(() => {
		reset({ name: data.name })
	}, [])

	return (
		<>
			<NameInput />
		</>
	)
}
