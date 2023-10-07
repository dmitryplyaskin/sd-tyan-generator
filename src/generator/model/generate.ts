/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerationSettings, MetaData, PipelineSteps } from "../types";
import { concatText, defaultStepValidator } from "./utils";

export const promptGenerator = (params: {
  data: PipelineSteps;
  settings: GenerationSettings;
}): string => {
  const { data, settings } = params;
  let finalPrompt = "";

  for (let i = 0; i < (Number(settings.count) || 1); i++) {
    const meta = {} as MetaData;
    let prompt = [] as string[];
    for (let j = 0; j < data.length; j++) {
      const item = data[j];

      if (item.type === "SimpleStep") {
        prompt = prompt.concat(defaultStepValidator(item, meta));
      }
      if (item.type === "BranchStep") {
        meta[item.id] = defaultStepValidator(item, meta);
      }
    }

    finalPrompt += concatText(prompt) + "\n";
  }

  return finalPrompt;
};
