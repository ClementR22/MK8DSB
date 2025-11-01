import { buildsDataMap } from "@/data/builds/buildsData";

export const getBuildStatsFromClassIds = (classIds: number[]): number[] => {
  // dans buildsDataMap, les builds ont pour clé classIds.join("-")
  const id: string = classIds.join("-");
  const buildData = buildsDataMap.get(id);

  return buildData?.stats;
};
