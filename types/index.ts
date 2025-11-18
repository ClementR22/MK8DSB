import * as MK8D from "./mk8d";
// import * as MKW from "./mkw";
export * from "./common";

// Les exports namespaced
// export { MK8D }; // MKW

export type Game = "MK8D" | "MKW";

// Types discriminés
/*
export type Character =
  | (MK8D.Character & { game: "MK8D" })  // ← "game" est le discriminant
  | (MKW.Character & { game: "MKW" });
*/
export type Category = MK8D.Category;
// | { game: "MKW"; value: MKW.Category };

export type Bodytype = MK8D.Bodytype;

export type ElementData = MK8D.ElementData;

export type StatName = MK8D.StatName;

export type SortName = MK8D.SortName;

export type ResultStat = MK8D.ResultStat;

export type ChosenStat = MK8D.ChosenStat;

export type BuildData = MK8D.BuildData;
