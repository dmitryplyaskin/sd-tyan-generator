/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerationSettings, MetaData, PipelineSteps } from "../types";
import { concatText, getStepValues, metaValidator } from "./utils";

export const promptGenerator = (params: {
  data: PipelineSteps;
  settings: GenerationSettings;
}): string => {
  const { data, settings } = params;
  let finalPrompt = "";

  for (let i = 0; i < (Number(settings.count) || 1); i++) {
    const meta = {} as MetaData;
    let prompt = [] as string[];
    prompt = generate(data, prompt, meta);
    console.log(prompt, meta);
    finalPrompt += concatText(prompt) + "\n";
  }

  return finalPrompt;

  function generate(data: PipelineSteps, prompt: string[], meta: MetaData) {
    for (let j = 0; j < data.length; j++) {
      const item = data[j];

      if (item.type === "SimpleStep") {
        prompt = prompt.concat(getStepValues(item, meta));
      }
      if (["BranchStep", "GroupBranchStep"].includes(item.type)) {
        meta[item.id] = getStepValues(item, meta);
      }

      if (item.type === "GroupBranchStep") {
        prompt = prompt.concat(
          metaValidator(item, meta, () => generate(item.render, prompt, meta))
        );
      }
    }
    return prompt;
  }
};
