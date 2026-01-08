export type Terrain = "ground" | "antiGravity" | "water" | "air";

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

export type StatNameSpeed = Extract<StatName, "speedGround" | "speedAntiGravity" | "speedWater" | "speedAir">;

export type StatNameHandling = Extract<
  StatName,
  "handlingGround" | "handlingAntiGravity" | "handlingWater" | "handlingAir"
>;

export type ResultStat = {
  name: StatName;
  checked: boolean;
};

export type ChosenStat = {
  name: StatName;
  checked: boolean;
  value: number | null;
  statFilterNumber: number;
};
