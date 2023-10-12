import {
  Box,
  Card,
  CardBody,
  Heading,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

import { Handle, Position, useNodeId, useUpdateNodeInternals } from "reactflow";
import { BranchStepInterface } from "../../types";
import { useEffect, useMemo, useRef } from "react";

export const BranchNode: React.FC<{ data: BranchStepInterface }> = ({
  data,
}) => {
  console.log(data);
  const nodeId = useNodeId();

  const updateNodeInternals = useUpdateNodeInternals();

  const ref = useRef(null);
  const handleList = useMemo(() => {
    return data.values.type === "default"
      ? data.values.data
      : Object.keys(data.values.data);
  }, [data.values.data, data.values.type]);

  const width = ref.current?.offsetWidth;
  const height = ref.current?.offsetHeight;

  const handleCount = handleList.length;

  const step = width / (handleCount - 1);

  const handles = [];

  for (let i = 0; i < handleList.length; i++) {
    const el = handleList[i];
    handles.push({
      id: `handle-${i}`,
      title: el,
      position: {
        x: i * step,
        y: height + 40,
      },
    });
  }

  useEffect(() => {
    if (nodeId) updateNodeInternals(nodeId);
  }, [handles, data.id, updateNodeInternals, nodeId]);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card border="1px" ref={ref}>
        <CardBody pb={0}>
          <Stack
            spacing={4}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Heading size="sm">{data?.name}</Heading>
            <IconButton aria-label="settings" icon={<SettingsIcon />} />
          </Stack>
          <Stack
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            transform={"translateY(7px)"}
          >
            {handles.map((x) => {
              return (
                <Box
                  style={{
                    pointerEvents: "none",
                  }}
                  p={2}
                >
                  {x.title}
                  <Handle
                    type="source"
                    position={Position.Bottom}
                    id={x.id}
                    style={{
                      position: "relative",
                    }}
                  ></Handle>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
