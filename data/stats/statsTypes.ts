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

export type StatNameCompare = StatName | "close" | "speed" | "handling";
export type StatNameSort = StatNameCompare | "id" | "name";

export type StatNameSpeed = Extract<
  StatNameCompare,
  "close" | "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir"
>;

export type StatNameHandling = Extract<
  StatNameCompare,
  "close" | "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;

export type StatNameCompareDefault = Exclude<StatNameCompare, StatNameSpeed | StatNameHandling>;
export type StatNameSortDefault = Exclude<StatNameSort, StatNameSpeed | StatNameHandling>;
