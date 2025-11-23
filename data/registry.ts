import * as mk8d from "./mk8d";
import * as mkw from "./mkw";

export const DataRegistry = {
  MK8D: mk8d,
  MKW: mkw,
} as const;

export type GameData = (typeof DataRegistry)[keyof typeof DataRegistry];
