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
    buildDataId: "10-20",
  },
  {
    buildDataId: "19-26",
  },
];
