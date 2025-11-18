import { BaseBuildData } from "../common/builds";
import { Bodytype } from "./bodytypes";

export type BuildData = BaseBuildData<
  [number, number, number, number, number, number, number, number, number, number, number, number], // 12 stats MK8D
  [number, number, number, number] // 4 classes
> & {
  bodytypes: Bodytype[];
};
