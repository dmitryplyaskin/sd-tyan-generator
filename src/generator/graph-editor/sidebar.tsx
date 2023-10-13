import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import React from "react";

export const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Stack spacing={4}>
      <Heading size="md">
        You can drag these nodes to the pane on the right.
      </Heading>
      <Node
        title={"Simple Node"}
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "SimpleNode")}
        draggable
      />
      <Node
        title={"Branch Node"}
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "BranchNode")}
        draggable
      />
      <Node
        title={"Template Node"}
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "TemplateNode")}
        draggable
      />
    </Stack>
  );
};

const Node = ({ title, ...props }) => (
  <Card border="1px" {...props}>
    <CardBody>
      <Heading size="sm">{title}</Heading>
    </CardBody>
  </Card>
);
