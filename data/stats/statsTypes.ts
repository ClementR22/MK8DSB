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

export type StatNameCompare = StatName | "speed" | "handling";
export type StatNameSort = StatNameCompare | "id" | "name";

export type StatNameSpeed = Extract<StatNameCompare, "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir">;

export type StatNameHandling = Extract<
  StatNameCompare,
  "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;

export type StatNameCompareDefault = Exclude<StatNameCompare, StatNameSpeed | StatNameHandling>;
export type StatNameSortBuildCardDefault = Exclude<StatNameSort, StatNameSpeed | StatNameHandling>;
export type StatNameSortElementDefault = "id" | StatNameSortBuildCardDefault;
