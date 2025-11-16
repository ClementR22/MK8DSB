export type StatName =
  | "speedGround"
  | "speedAntiGravity"
  | "speedWater"
  | "speedAir"
  | "acceleration"
  | "weight"
  | "handlingGround"
  | "handlingAntiGravity"
  | "handlingWater"
  | "handlingAir"
  | "traction"
  | "miniTurbo";

export type StatNameSort = StatName | "speed" | "handling";
export type SortName = StatNameSort | "id" | "name";

export type StatNameSpeed = Extract<StatNameSort, "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir">;

export type StatNameHandling = Extract<
  StatNameSort,
  "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;

export type StatNameCompareDefault = Exclude<StatNameSort, StatNameSpeed | StatNameHandling>;
export type StatNameSortBuildCardDefault = Exclude<SortName, StatNameSpeed | StatNameHandling>;
export type StatNameSortElementDefault = "id" | StatNameSortBuildCardDefault;
