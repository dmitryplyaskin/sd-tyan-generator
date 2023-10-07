import { SimpleStepInterface } from "../../types";
import { getOneParam, getRandomParams, optionalParam } from "../utils";

export const simpleStep = (data: SimpleStepInterface) => {
  console.log(data);
  let arr = [] as string[];
  if (data.isRange) {
    arr = getRandomParams(data.values, data.range || [1, 1]);
  } else {
    arr.push(getOneParam(data.values));
  }
  if (data.isOptional) return optionalParam(arr, data.optionalChance);
  return arr;
};
