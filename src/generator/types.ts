export interface MainStepInterface {
  type: string;
  name: string;
  targetTags: { [key: string]: string[] };
  id: string;
  isOptional?: boolean;
  optionalChance?: number;
  isRange?: boolean;
  range?: [number, number];
}

export type ValuesType = string[] | { [key: string]: number };

export interface SimpleStepInterface extends MainStepInterface {
  type: "SimpleStep";
  values: ValuesType;
}

export interface BranchStepInterface extends MainStepInterface {
  type: "BranchStep";
  values: ValuesType;
}

export type StepType = SimpleStepInterface | BranchStepInterface;

export type PipelineSteps = StepType[];

export type GenerationSettings = {
  count: string | number;
};

export type MetaData = { [key: string]: string[] };
export type TagObject = { [key: string]: string[] };
