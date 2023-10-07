import {
  Button,
  Card,
  CardBody,
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
import { SimpleStepInterface, StepType } from "./types";
import React from "react";
import { useStore } from "effector-react";
import { $generatorState, changeSimpleType } from "./model/state";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UiSlider } from "../components/ui/slider";
import { UiRangeSlider } from "../components/ui/range_slider";

export const Generator = () => {
  const list = useStore($generatorState);
  console.log(list);

  return (
    <Card>
      <CardBody>
        <Stack spacing="4">
          <Heading size="md">Генератор</Heading>
          {list.map((x) => (
            <CheckStepType data={x} key={x.id} />
          ))}
          ;
        </Stack>
      </CardBody>
    </Card>
  );
};

const CheckStepType: React.FC<{ data: StepType }> = ({ data }) => {
  switch (data.type) {
    case "SimpleStep":
      return <SimpleStep data={data} />;

    default:
      return null;
  }
};

type SimpleStepInputs = {
  name: string;
  tags: string;
  values: string;
  isOptional: boolean;
  optionalChance: number;
  isRange: boolean;
  range: [number, number];
};

const SimpleStep: React.FC<{ data: SimpleStepInterface }> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, control } = useForm<SimpleStepInputs>({
    defaultValues: {
      name: data.name,
      tags: data.tags?.join("\n"),
      values: data.values.join("\n"),
      isOptional: data.isOptional,
      optionalChance: data.optionalChance ?? 0.5,
      isRange: data.isRange,
      range: data.range || [1, 3],
    },
  });
  const onSubmit: SubmitHandler<SimpleStepInputs> = (values) => {
    console.log(values);
    changeSimpleType({
      ...data,
      name: values.name,
      tags: values.tags.split("\n"),
      values: values.values.split("\n"),
      isOptional: values.isOptional,
      optionalChance: values.optionalChance,
      isRange: values.isRange,
      range: values.range,
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
                <Textarea {...register("tags")} />
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
                      max={data.values.length}
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
