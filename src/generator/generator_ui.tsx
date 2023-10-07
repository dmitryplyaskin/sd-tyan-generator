import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { StepType } from "./types";
import React from "react";
import { useStore } from "effector-react";
import { $generatorState } from "./model/state";
import { SimpleStep } from "./components/simple";
import { BranchStep } from "./components/branch";

export const Generator = () => {
  const list = useStore($generatorState);

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
    case "BranchStep":
      return <BranchStep data={data} />;

    default:
      return null;
  }
};
