import { MetaData, StepType } from "../types";

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const concatText = (array: string[]) => array.join(", ");
export const getOneParam = (array: string[]) =>
  array[getRandomIntInclusive(0, array.length - 1)];

export const getRandomParams = (
  arr: string[],
  range: [min: number, max: number]
) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const count = getRandomIntInclusive(range[0], range[1]);
  return shuffled.slice(0, count);
};

export const randomBoolean = (weight = 0.5) => {
  return Math.random() < weight;
};

export const optionalParam = (result: string[], wight = 0.5) => {
  const condition = randomBoolean(wight);

  if (condition) return result;
  return [] as string[];
};

const arraysIntersect = (arr: string[], obj: { [key: string]: string[] }) => {
  return Object.values(obj).some((subArr) => {
    return subArr.some((value) => arr.includes(value));
  });
};

export const weightedRandom = (odds: { [key: string]: number }) => {
  let sum = 0;
  for (const key in odds) {
    sum += odds[key];
  }

  let random = Math.floor(Math.random() * sum) + 1;

  for (const key in odds) {
    random -= odds[key];
    if (random <= 0) return key;
  }

  return "";
};

export const weightedRandomMultiple = (
  odds: {
    [key: string]: number;
  },
  countRange: [min: number, max: number]
): string[] => {
  type WeightItem = {
    value: string;
    weight: number;
  };

  const weights: WeightItem[] = [];
  let sum = 0;

  for (const key in odds) {
    sum += odds[key];
    weights.push({ value: key, weight: odds[key] });
  }

  const results: string[] = [];
  const [min, max] = countRange;
  const count = Math.floor(Math.random() * (max - min + 1)) + min;

  const used: Record<string, boolean> = {};

  for (let i = 0; i < count; i++) {
    let randomValue = "";

    do {
      let random = Math.floor(Math.random() * sum) + 1;

      for (const weight of weights) {
        random -= weight.weight;
        if (random <= 0) {
          randomValue = weight.value;
          break;
        }
      }
    } while (used[randomValue]);

    used[randomValue] = true;
    results.push(randomValue);
  }

  return results;
};

export const getStepValues = <T extends StepType>(data: T, meta: MetaData) => {
  let arr = [] as string[];
  const checkTarget = Boolean(Object.entries(data.targetTags).length);

  const metaKeys = Object.keys(data.targetTags);
  const metaArray = metaKeys.reduce(
    (a, c) => a.concat(meta[c]),
    [] as string[]
  );

  if (checkTarget && !arraysIntersect(metaArray, data.targetTags)) {
    return [];
  }

  if (data.isRange) {
    arr =
      data.values.type === "default"
        ? getRandomParams(data.values.data, data.range || [1, 1])
        : weightedRandomMultiple(data.values.data, data.range || [1, 1]);
  } else {
    arr.push(
      data.values.type === "default"
        ? getOneParam(data.values.data)
        : weightedRandom(data.values.data)
    );
  }
  if (data.isOptional) return optionalParam(arr, data.optionalChance);
  return arr;
};

export const metaValidator = <T extends StepType>(
  data: T,
  meta: MetaData,
  fn: () => string[]
) => {
  const checkTarget = Boolean(Object.entries(data.targetTags).length);
  const metaKeys = Object.keys(data.targetTags);
  const metaArray = metaKeys.reduce(
    (a, c) => a.concat(meta[c]),
    [] as string[]
  );
  console.log(metaArray, data.targetTags);
  if (checkTarget && !arraysIntersect(metaArray, data.targetTags)) {
    return [];
  }
  return fn();
};
