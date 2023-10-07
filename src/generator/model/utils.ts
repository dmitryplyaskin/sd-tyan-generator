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
