import { Card, CardBody, Heading, IconButton, Stack } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import { Handle, Position } from "reactflow";
import { SimpleStepInterface } from "../../types";

export const SimpleNode: React.FC<{ data: SimpleStepInterface }> = ({
  data,
}) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card border="1px">
        <CardBody>
          <Stack
            spacing={4}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Heading size="sm">{data?.name}</Heading>
            <IconButton aria-label="settings" icon={<SettingsIcon />} />
          </Stack>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};
