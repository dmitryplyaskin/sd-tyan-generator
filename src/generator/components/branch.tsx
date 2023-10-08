import {
  Button,
  Heading,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  BranchStepInterface,
  TagObject,
  ValuesFormatType,
  ValuesType,
} from "../types";
import { changeBranchType } from "../model/state";
import { UiSlider } from "../../components/ui/slider";
import { UiRangeSlider } from "../../components/ui/range_slider";
import { UiCheckBoxGroup } from "../../components/ui/checkbox_group";
import { inputFormatTextAreaFormat, outputFormatTextAreaFormat } from "./utils";

type BranchStepInputs = {
  name: string;
  targetTags: TagObject;
  values: string;
  valuesType: ValuesFormatType;
  isOptional: boolean;
  optionalChance: number;
  isRange: boolean;
  range: [number, number];
};

export const BranchStep: React.FC<{
  data: BranchStepInterface;
}> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, control } = useForm<BranchStepInputs>({
    defaultValues: {
      name: data.name,
      targetTags: data.targetTags,
      values: inputFormatTextAreaFormat(data.values),
      valuesType: data.values.type,
      isOptional: data.isOptional,
      optionalChance: data.optionalChance ?? 0.5,
      isRange: data.isRange,
      range: data.range || [1, 2],
    },
  });
  const onSubmit: SubmitHandler<BranchStepInputs> = (values) => {
    changeBranchType({
      ...data,
      ...values,
      values: {
        type: values.valuesType,
        data: outputFormatTextAreaFormat(values.values, values.valuesType),
      } as ValuesType,
    });
    onClose();
  };
  const btnRef = React.useRef<any>();

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" p="3">
        <Stack
          spacing="4"
          display={"flex"}
          justifyContent={"space-between"}
          direction={"row"}
          align="center"
        >
          <Heading size="sm">{data.name}</Heading>
          <Button onClick={onOpen}>Настройки</Button>
        </Stack>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxW={"700px"}>
          <DrawerCloseButton />

          <DrawerHeader>Настройки {data.name}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={"4"}>
              <FormControl>
                <FormLabel>Название</FormLabel>
                <Input {...register("name")} />
              </FormControl>
              <FormControl>
                <FormLabel>Триггер теги</FormLabel>
                <Controller
                  name="targetTags"
                  control={control}
                  render={({ field }) => (
                    <UiCheckBoxGroup
                      value={field.value}
                      ignore={[data.id]}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Значения</FormLabel>
                <Textarea h={"400px"} {...register("values")} />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Случайный параметр (шанс с которым парметр попадет в
                  генерацию)
                </FormLabel>
                <Checkbox size="lg" {...register("isOptional")} sx={{ mb: 8 }}>
                  Включить
                </Checkbox>
                <Controller
                  name="optionalChance"
                  control={control}
                  render={({ field }) => (
                    <UiSlider
                      max={1}
                      min={0}
                      step={0.01}
                      defaultValue={data.optionalChance ?? 0.5}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Выбрать несколько случайных значений (от и до)
                </FormLabel>
                <Checkbox size="lg" {...register("isRange")} sx={{ mb: 8 }}>
                  Включить
                </Checkbox>
                <Controller
                  name="range"
                  control={control}
                  render={({ field }) => (
                    <UiRangeSlider
                      min={1}
                      max={
                        data.values.type === "default"
                          ? data.values.data.length
                          : Object.keys(data.values.data).length
                      }
                      step={1}
                      value={field.value}
                      onChange={field.onChange}
                      defaultValue={[1, 3]}
                    />
                  )}
                />
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Отменить
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
              Сохранить
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
