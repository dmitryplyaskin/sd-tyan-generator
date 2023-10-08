import { createEvent, createStore, sample } from "effector";
import { DEFAULT_DATA } from "../deafult_data";
import {
  GenerationSettings,
  PipelineSteps,
  SimpleStepInterface,
  BranchStepInterface,
  TagObject,
} from "../types";
import { promptGenerator } from "./generate";

export const $generatorState = createStore<PipelineSteps>(DEFAULT_DATA);
export const changeSimpleType = createEvent<SimpleStepInterface>();
export const changeBranchType = createEvent<BranchStepInterface>();
export const setGeneratorState = createEvent<PipelineSteps>();

$generatorState
  .on(changeSimpleType, (state, data) => {
    return state.map((x) => {
      if (x.id !== data.id) return x;
      return { ...x, ...data };
    });
  })
  .on(setGeneratorState, (_, data) => data);

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
