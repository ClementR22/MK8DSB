import { setsData } from "@/data/setsData";

export const getSetStatsFromClassIds = (classIds: number[]): number[] => {
  // dans setsData, les sets ont pour clé classIds.join("-")
  const id: string = classIds.join("-");
  const setData = setsData.get(id);

  return setData?.stats;
};
