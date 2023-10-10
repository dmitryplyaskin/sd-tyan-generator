export type RangeType = {
  isRange: boolean;
  value: [min: number, max: number];
};

export interface MainStepInterface {
  type: string;
  name: string;
  targetTags: { [key: string]: string[] };
  id: string;
  isOptional?: boolean;
  optionalChance?: number;
  range?: RangeType;
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
export interface GroupBranchStepInterface extends MainStepInterface {
  type: "GroupBranchStep";
  values: ValuesType;
  render: PipelineSteps;
}
export interface TemplateStepInterface extends MainStepInterface {
  type: "TemplateStep";
  templates: ValuesType;
  keys: {
    [key: string]: ValuesType;
  };
}

export type StepWithValuesType =
  | SimpleStepInterface
  | BranchStepInterface
  | GroupBranchStepInterface;

export type StepType =
  | SimpleStepInterface
  | BranchStepInterface
  | GroupBranchStepInterface
  | TemplateStepInterface;

export type PipelineSteps = StepType[];

export type GenerationSettings = {
  count: string | number;
};

export type MetaData = { [key: string]: string[] };
export type TagObject = { [key: string]: string[] };

export type PresetTemplateFileType = {
  name: string;
  id: string;
  version: string;
  template: PipelineSteps;
};
