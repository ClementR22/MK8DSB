import { StatName, StatNameHandling, StatNameSpeed } from "./stats";
import { Terrain } from "./stats";
import { IconType } from "react-native-dynamic-vector-icons";

type StatNameSort = StatName | "speed" | "handling";

export type StatNameSortDefault = Exclude<StatNameSort, StatNameSpeed | StatNameHandling>;

export type SortName = StatNameSort | "id" | "name";

export type SortNameElementDefault = Exclude<SortName, StatNameSpeed | StatNameHandling>;

export type SortNameBuildCardDefault = Exclude<SortNameElementDefault, "id">;

export interface SortButtonProps {
  iconName: string;
  iconType: IconType;
  backgroundColor?: Terrain; // Make it optional as it's only for terrain stats
}
