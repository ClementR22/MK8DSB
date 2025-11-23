import * as MK8D from "./mk8d";
import * as MKW from "./mkw";
export * from "./common";

// Les exports namespaced
// export { MK8D, MKW };

export type Game = "MK8D" | "MKW";

// Types fusionnés
export type Category = MK8D.Category | MK8D.Category;

export type Bodytype = MK8D.Bodytype | MKW.Bodytype;

export type ElementData = MK8D.ElementData | MKW.ElementData;

export type StatName = MK8D.StatName | MKW.StatName | MKW.StatName;

export type SortName = MK8D.SortName | MKW.SortName;

export type ResultStat = MK8D.ResultStat | MKW.ResultStat;

export type ChosenStat = MK8D.ChosenStat | MKW.ChosenStat;

export type BuildData = MK8D.BuildData | MKW.BuildData;
