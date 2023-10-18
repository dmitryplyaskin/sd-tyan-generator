import { Card, CardBody, Heading } from "@chakra-ui/react";

import { Handle, Position } from "reactflow";

export const StartNode = () => {
  return (
    <>
      <Card border="1px" bgColor="green.100">
        <CardBody>
          <Heading size="sm">Start</Heading>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};
