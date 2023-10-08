import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { StepType } from "./types";
import React, { useCallback } from "react";
import { useStore } from "effector-react";
import { $generatorState, setGeneratorState } from "./model/state";
import { SimpleStep } from "./components/simple";
import { BranchStep } from "./components/branch";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

export const Generator = () => {
  const list = useStore($generatorState);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setGeneratorState(
      update(list, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, list[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((data: StepType, index: number) => {
    return (
      <CheckStepType
        data={data}
        key={data.id}
        index={index}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <Card>
      <CardBody>
        <Stack spacing="4">
          <Heading size="md">Генератор</Heading>
          <DndProvider backend={HTML5Backend}>
            {list.map((x, i) => renderCard(x, i))}
          </DndProvider>
        </Stack>
      </CardBody>
    </Card>
  );
};

const CheckStepType: React.FC<{
  data: StepType;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}> = ({ data, index, moveCard }) => {
  switch (data.type) {
    case "SimpleStep":
      return <SimpleStep data={data} index={index} moveCard={moveCard} />;
    case "BranchStep":
      return <BranchStep data={data} index={index} moveCard={moveCard} />;

    default:
      return null;
  }
};
