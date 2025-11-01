import rawBuildsData from "./buildsData.json";
import { BuildData } from "./buildsTypes";

export const buildsDataArray: BuildData[] = Object.entries(rawBuildsData).map(([id, build]) => ({
  id,
  ...build,
}));

export const buildsDataMap: Map<string, BuildData> = new Map(buildsDataArray.map((b) => [b.id, b]));
