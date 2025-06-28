import { setsData } from "@/data/data";

export const getSetStatsFromElementsClassIds = (classIdsSeeked: number[]): number[] => {
  const setId: string = classIdsSeeked.join("-");
  return setsData.get(setId).stats;
};
