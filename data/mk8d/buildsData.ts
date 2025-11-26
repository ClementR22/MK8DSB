import { BuildData } from "@/types/mk8d/builds";
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

export const numberOfElementsByCategory: Array<number> = [16, 14, 9, 4];
