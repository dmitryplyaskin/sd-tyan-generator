/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenerationSettings, PipelineSteps } from "../types";
import { simpleStep } from "./steps/simpe_step";
import { concatText, getOneParam } from "./utils";

export const promptGenerator = (params: {
  data: PipelineSteps;
  settings: GenerationSettings;
}): string => {
  const { data, settings } = params;
  let finalPrompt = "";

  for (let i = 0; i < (Number(settings.count) || 1); i++) {
    const meta = {} as { [key: string]: any };
    let prompt = [] as string[];
    for (let j = 0; j < data.length; j++) {
      const item = data[j];

      if (item.type === "SimpleStep") {
        prompt = prompt.concat(simpleStep(item));
      }
    }
    finalPrompt += concatText(prompt) + "\n";
  }

  console.log(finalPrompt);
  return finalPrompt;
};
