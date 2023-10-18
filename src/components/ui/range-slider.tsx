import {
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
} from '@chakra-ui/react'

type UiRangeSliderProps = {
	min: number
	max: number
	step: number
	defaultValue?: [number, number]
	value: [number, number]
	onChange: (value: [number, number]) => void
}

export const UiRangeSlider: React.FC<UiRangeSliderProps> = ({
	onChange,
	...data
}) => {
	return (
		<RangeSlider aria-label={['min', 'max']} {...data} onChange={onChange}>
			<RangeSliderTrack>
				<RangeSliderFilledTrack />
			</RangeSliderTrack>
			<RangeSliderMark
				value={data.value[0]}
				textAlign="center"
				bg="blue.500"
				color="white"
				mt="-10"
				ml="-5"
				w="12"
			>
				{data.value[0]}
			</RangeSliderMark>
			<RangeSliderMark
				value={data.value[1]}
				textAlign="center"
				bg="blue.500"
				color="white"
				mt="-10"
				ml="-5"
				w="12"
			>
				{data.value[1]}
			</RangeSliderMark>
			<RangeSliderThumb index={0} />
			<RangeSliderThumb index={1} />
		</RangeSlider>
	)
}
