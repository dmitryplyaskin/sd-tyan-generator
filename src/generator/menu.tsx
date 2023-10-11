import { Button, Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { $activeTemplate, $templates, selectTemplate } from "./model/state";

export const Menu = () => {
  const templates = useStore($templates);
  const active = useStore($activeTemplate);

  return (
    <Stack spacing={"4"}>
      <Card>
        <CardBody>
          <Stack spacing="2">
            <Heading size="md">Список темплейтов:</Heading>
            {templates.map((x) => (
              <Button
                variant={"outline"}
                color={active.id === x.id ? "blue" : undefined}
                key={x.id}
                onClick={() => selectTemplate(x)}
              >
                {x.name}
              </Button>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
