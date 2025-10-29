import { buildsData } from "@/data/buildsData";

export const getBuildStatsFromClassIds = (classIds: number[]): number[] => {
  // dans buildsData, les builds ont pour clé classIds.join("-")
  const id: string = classIds.join("-");
  const buildData = buildsData.get(id);

  return buildData?.stats;
};
