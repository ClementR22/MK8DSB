export type Stat =
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

export type CompareName = "close" | "speed" | "handling" | Stat;
