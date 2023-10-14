import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const NameInput = () => {
	const { register } = useFormContext()

	return (
		<FormControl>
			<FormLabel>Название</FormLabel>
			<Input {...register('name')} />
		</FormControl>
	)
}
