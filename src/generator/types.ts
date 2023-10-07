export interface MainStepInterface {
  type: string;
  name: string;
  id: string;
  isOptional?: boolean;
  optionalChance?: number;
  isRange?: boolean;
  range?: [number, number];
}

export interface SimpleStepInterface extends MainStepInterface {
  type: "SimpleStep";
  tags?: string[];
  values: string[];
}

export type StepType = SimpleStepInterface;

export type PipelineSteps = StepType[];

export type GenerationSettings = {
  count: string | number;
};
