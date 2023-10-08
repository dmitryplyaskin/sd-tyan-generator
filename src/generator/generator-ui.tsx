import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Heading,
  Stack,
  Input,
} from "@chakra-ui/react";
import { PipelineSteps, StepType } from "./types";
import React from "react";
import { useStore } from "effector-react";
import {
  $generatorState,
  setGeneratorState,
  uploadGenerator,
} from "./model/state";
import { SimpleStep } from "./components/simple";
import { BranchStep } from "./components/branch";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { GroupBranchStep } from "./components/group-branch";
import { saveDataAsJSONFile } from "../utils/save-data-as-json-file";

const reorder = (list: PipelineSteps, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const Generator = () => {
  const list = useStore($generatorState);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      uploadGenerator(JSON.parse(text));
    };

    reader.readAsText(file);
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const data = reorder(list, result.source.index, result.destination.index);

    setGeneratorState(data);
  };

  return (
    <Card h="full">
      <CardBody>
        <Stack spacing="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="md">Генератор</Heading>
            <ButtonGroup spacing="2">
              <Input
                type="file"
                hidden
                id="fileUpload"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => document.getElementById("fileUpload")?.click()}
              >
                Загрузить
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => saveDataAsJSONFile(list)}
              >
                Скачать
              </Button>
            </ButtonGroup>
          </Box>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <Stack
                  spacing="4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.map((data, index) => (
                    <Draggable
                      key={data.id}
                      draggableId={data.id}
                      index={index}
                    >
                      {(providedItem) => (
                        <div
                          {...providedItem.draggableProps}
                          {...providedItem.dragHandleProps}
                          ref={providedItem.innerRef}
                        >
                          <CheckStepType data={data} key={data.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      </CardBody>
    </Card>
  );
};

const CheckStepType: React.FC<{
  data: StepType;
}> = ({ data }) => {
  switch (data.type) {
    case "SimpleStep":
      return <SimpleStep data={data} />;
    case "BranchStep":
      return <BranchStep data={data} />;
    case "GroupBranchStep":
      return (
        <GroupBranchStep
          data={data}
          render={
            <Droppable droppableId="items">
              {(provided) => (
                <Stack
                  spacing="4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.render.map((data, index) => (
                    <Draggable
                      key={data.id}
                      draggableId={data.id}
                      index={index}
                    >
                      {(providedItem) => (
                        <div
                          {...providedItem.draggableProps}
                          {...providedItem.dragHandleProps}
                          ref={providedItem.innerRef}
                        >
                          <CheckStepType data={data} key={data.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </Stack>
              )}
            </Droppable>
          }
        />
      );

    default:
      return null;
  }
};
