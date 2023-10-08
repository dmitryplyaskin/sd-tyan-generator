import { createEvent, createStore, sample } from "effector";
import { DEFAULT_DATA } from "../deafult-data";
import {
  GenerationSettings,
  PipelineSteps,
  SimpleStepInterface,
  BranchStepInterface,
  GroupBranchStepInterface,
  TagObject,
  StepType,
} from "../types";
import { promptGenerator } from "./generate";

export const $generatorState = createStore<PipelineSteps>(DEFAULT_DATA);
export const uploadGenerator = createEvent<PipelineSteps>();
export const changeSimpleType = createEvent<SimpleStepInterface>();
export const changeBranchType = createEvent<BranchStepInterface>();
export const changeGroupBranchType = createEvent<GroupBranchStepInterface>();
export const setGeneratorState = createEvent<PipelineSteps>();

const setNewState = (state: PipelineSteps, data: StepType): PipelineSteps => {
  return state.map((x) => {
    if (x.id !== data.id) {
      if (x.type === "GroupBranchStep") {
        return { ...x, render: setNewState(x.render, data) };
      }
      return x;
    }
    return { ...x, ...data };
  });
};

$generatorState
  .on([changeSimpleType, changeBranchType, changeGroupBranchType], setNewState)
  .on(setGeneratorState, (_, data) => data)
  .on(uploadGenerator, (_, data) => data);

export const $tagList = $generatorState.map((x) =>
  x
    .filter((x) => x.type === "BranchStep")
    .reduce(
      (a, c) => ({
        ...a,
        [c.id]:
          c.values.type === "default"
            ? c.values.data
            : Object.keys(c.values.data),
      }),
      {} as TagObject
    )
);

export const $generateResult = createStore("");
export const generateCore = createEvent<{
  data: PipelineSteps;
  settings: GenerationSettings;
}>();
export const generate = createEvent<GenerationSettings>();

$generateResult.on(generateCore, (_, data) => promptGenerator(data));

sample({
  source: $generatorState,
  clock: generate,
  fn: (data, settings) => ({ data, settings }),
  target: generateCore,
});
