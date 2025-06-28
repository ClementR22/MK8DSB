import { setsData } from "@/data/setsData";

export const getSetStatsFromClassIds = (classIds: number[]): number[] => {
  const setId: string = classIds.join("-");
  return setsData.get(setId).stats;
};
