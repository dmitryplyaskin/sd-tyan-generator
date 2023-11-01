/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useMemo } from 'react'
import {
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Box,
	RadioGroup,
	Radio,
	Stack,
	Checkbox,
} from '@chakra-ui/react'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { UiSlider } from '../../../../components/ui/slider'
import { UiRangeSlider } from '../../../../components/ui/range-slider'
import { outputFormatTextAreaFormat } from '../../../../model/utils/format-value'

export const NameInput = () => {
	const { register } = useFormContext()

	return (
		<FormControl>
			<FormLabel>Title:</FormLabel>
			<Input {...register('name')} />
		</FormControl>
	)
}

export const ValueInput: React.FC<{ name?: string; height?: string }> = ({
	name = 'values',
	height = '400px',
}) => {
	const { register, control } = useFormContext()

	return (
		<Box>
			<FormControl display={'flex'} alignItems={'center'} gap={4} mb="2">
				<FormLabel m="0" htmlFor="values-type-id" size={'sm'}>
					Value type:
				</FormLabel>
				<Controller
					name={`${name}.type`}
					control={control}
					render={({ field }) => (
						<RadioGroup
							onChange={e => field.onChange(e)}
							value={field.value || 'default'}
							defaultValue="default"
						>
							<Stack direction="row">
								<Radio value="default">Default</Radio>
								<Radio value="weight">Weight</Radio>
							</Stack>
						</RadioGroup>
					)}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Value</FormLabel>
				<Textarea h={height} {...register(`${name}.data`)} />
			</FormControl>
		</Box>
	)
}
export const OptionalChanceInput = () => {
	const { register, control } = useFormContext()

	return (
		<FormControl>
			<FormLabel>
				Случайный параметр (шанс с которым парметр попадет в генерацию)
			</FormLabel>
			<Checkbox size="lg" {...register('optional.isOptional')} sx={{ mb: 8 }}>
				Enable
			</Checkbox>
			<Controller
				name="optional.value"
				control={control}
				render={({ field }) => (
					<UiSlider
						max={1}
						min={0}
						step={0.01}
						defaultValue={field.value ?? 0.5}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>
		</FormControl>
	)
}
export const RangeInput = () => {
	const { register, control } = useFormContext()
	const [type, value] = useWatch({
		name: ['values.type', 'values.data'],
	})
	const formattedValue = outputFormatTextAreaFormat(
		typeof value !== 'string' ? '' : value,
		type
	)

	return (
		<FormControl>
			<FormLabel>Выбрать несколько случайных значений (от и до)</FormLabel>
			<Checkbox size="lg" {...register('range.isRange')} sx={{ mb: 8 }}>
				Включить
			</Checkbox>
			<Controller
				name="range.value"
				control={control}
				render={({ field }) => {
					return (
						<UiRangeSlider
							min={1}
							max={
								type === 'default'
									? // @ts-expect-error
									  formattedValue?.length
									: Object.keys(formattedValue).length
							}
							step={1}
							value={field.value || [1, 2]}
							defaultValue={field.value || [1, 2]}
							onChange={field.onChange}
						/>
					)
				}}
			/>
		</FormControl>
	)
}
export const TemplateInput = () => {
	const [type, value] = useWatch({ name: ['templates.type', 'templates.data'] })
	const values = useWatch()
	const form = useFormContext()

	const keys = useMemo(() => {
		const formattedValue = outputFormatTextAreaFormat(
			typeof value !== 'string' ? '' : value,
			type
		)

		const keys_ =
			(formattedValue as string[])
				?.map?.(x => x.match(/\${(.+?)}/g))
				?.reduce((a, c) => [...a, ...(c || [])], [] as string[])
				?.map(x => x.replace(/\${(.+?)}/g, '$1')) || []

		return [...new Set(keys_)]
	}, [type, value])

	useEffect(() => {
		const deadKeys = Object.keys(values.keys || {}).filter(
			x => !keys.includes(x)
		)

		if (deadKeys.length) {
			deadKeys.forEach(x => {
				form.unregister(`keys.${x}`)
			})
		}
	}, [keys])

	return (
		<FormControl>
			<FormLabel>Переменные</FormLabel>
			<Stack spacing={4} p={4}>
				{keys?.map(x => (
					<>
						<FormLabel>Переменная: {x}</FormLabel>
						<ValueInput name={`keys.${x}`} height="200px" />
					</>
				))}
			</Stack>
		</FormControl>
	)
}
