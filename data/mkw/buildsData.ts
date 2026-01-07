import { BuildData } from "@/types/mkw/builds";
import rawBuildsData from "./buildsData.json";

export const buildsDataArray: BuildData[] = Object.entries(rawBuildsData).map(
  ([id, build]) =>
    ({
      buildDataId: id,
      ...build,
    } as BuildData)
);

export const buildsDataMap: Map<string, BuildData> = new Map(
  buildsDataArray.map((buildData) => [buildData.buildDataId, buildData])
);

export const numberOfClassesByCategory: Array<number> = [20, 24];
