import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { $generateResult, generate } from "./model/state";
import { useStore } from "effector-react/effector-react.mjs";

export const Result = () => {
  const value = useStore($generateResult);
  const [count, setCount] = useState<number | string>(10);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Stack spacing={"4"}>
      <Card>
        <CardBody>
          <Stack spacing="4">
            <Heading size="md">Результат генерации</Heading>
            <Textarea value={value} h={"400px"} />
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => generate({ count: 10 })}
              >
                Сгенерировать
              </Button>
              <Button variant="outline" colorScheme="blue" onClick={handleCopy}>
                Скопировать
              </Button>
            </ButtonGroup>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack spacing="4">
            <Heading size="md">Настройки</Heading>
            <FormControl>
              <FormLabel>Колличество генераций</FormLabel>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value) || "")}
              />
            </FormControl>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
