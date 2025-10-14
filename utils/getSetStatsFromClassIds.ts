import { setsData } from "@/data/setsData";

export const getSetStatsFromClassIds = (classIds: number[]): number[] => {
  // dans setsData, les sets ont pour clé classIds.join("-")
  const setId: string = classIds.join("-");
  const setData = setsData.get(setId);

  if (!setData?.stats) {
    throw new Error("ThisSetDoesNotExist");
  }

  return setData.stats;
};
