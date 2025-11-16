import rawBuildsData from "./buildsData.json";
import { BuildData } from "../../types/buildsTypes";

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
