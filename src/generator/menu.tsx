import { Button, Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { $templates } from "./model/state";

export const Menu = () => {
  const templates = useStore($templates);
  console.log(templates);
  return (
    <Stack spacing={"4"}>
      <Card>
        <CardBody>
          <Stack spacing="2">
            <Heading size="md">Список темплейтов:</Heading>
            {templates.map((x) => (
              <Button variant={"outline"}>{x.name}</Button>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
