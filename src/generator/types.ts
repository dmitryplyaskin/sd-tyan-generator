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

export type CoreValuesType = string[] | { [key: string]: number };
export type ValuesFormatType = "default" | "weight";

export type DefaultValueType = {
  data: string[];
  type: "default";
};
export type WeightValueType = {
  data: { [key: string]: number };
  type: "weight";
};

export type ValuesType = DefaultValueType | WeightValueType;

export interface SimpleStepInterface extends MainStepInterface {
  type: "SimpleStep";
  values: ValuesType;
}

export interface BranchStepInterface extends MainStepInterface {
  type: "BranchStep";
  values: ValuesType;
}
export interface BranchGroupStepInterface extends MainStepInterface {
  type: "GroupBranchStep";
  values: ValuesType;
  render: PipelineSteps;
}

export type StepType =
  | SimpleStepInterface
  | BranchStepInterface
  | BranchGroupStepInterface;

export type PipelineSteps = StepType[];

export type GenerationSettings = {
  count: string | number;
};

export type MetaData = { [key: string]: string[] };
export type TagObject = { [key: string]: string[] };
