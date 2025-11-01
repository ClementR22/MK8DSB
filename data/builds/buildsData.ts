import rawBuildsData from "./buildsData.json";
import { BuildData } from "./buildsTypes";

export const buildsDataArray: BuildData[] = Object.entries(rawBuildsData).map(([id, build]) => ({
  dataId: id,
  ...build,
}));

export const buildsDataMap: Map<string, BuildData> = new Map(
  buildsDataArray.map((buildData) => [buildData.dataId, buildData])
);
