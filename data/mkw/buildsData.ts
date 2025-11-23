import { BuildData } from "@/types/mkw/builds";
import rawBuildsData from "./buildsData.json";
import { Build } from "@/types/common/builds";

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

export const buildsListDisplayedInit: Build[] = [
  {
    buildDataId: "9-16-30-39",
  },
  {
    buildDataId: "15-22-31-42",
  },
];
