import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

type UiSliderProps = {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  value: number;
  onChange: (value: number) => void;
};

export const UiSlider: React.FC<UiSliderProps> = ({ onChange, ...data }) => {
  return (
    <Slider aria-label="slider-ex-1" {...data} onChange={onChange}>
      <SliderMark
        value={data.value}
        textAlign="center"
        bg="blue.500"
        color="white"
        mt="-10"
        ml="-5"
        w="12"
      >
        {Math.floor(data.value * 100)}%
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};
