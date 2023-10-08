import { Box, Checkbox, CheckboxGroup, Heading, Stack } from "@chakra-ui/react";
import { TagObject } from "../../generator/types";
import { useStore } from "effector-react/effector-react.mjs";
import { $tagList } from "../../generator/model/state";

type UiCheckBoxGroupProps = {
  value: TagObject;
  onChange: (value: TagObject) => void;
  ignore?: string[];
};

export const UiCheckBoxGroup: React.FC<UiCheckBoxGroupProps> = ({
  value,
  onChange,
  ignore = [],
}) => {
  const checkboxList = useStore($tagList);

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg">
      <Stack spacing={4}>
        {Object.entries(checkboxList)
          .filter((x) => !ignore.includes(x[0]))
          .map(([key, checkboxes]) => (
            <CheckboxGroup
              key={key}
              colorScheme="green"
              value={value[key]}
              onChange={(v) => onChange({ ...value, [key]: v as string[] })}
            >
              <Heading size={"sm"}>{key}</Heading>
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {checkboxes.map((tag) => (
                  <Checkbox
                    key={tag}
                    value={tag}
                    isChecked={value?.[key]?.includes(tag)}
                  >
                    {tag}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          ))}
      </Stack>
    </Box>
  );
};
