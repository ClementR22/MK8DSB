import { Game } from "@/types";
import * as mk8d from "./mk8d";
import * as mkw from "./mkw";
import { VERSION as MK8D_VERSION } from "./mk8d";
import { VERSION as MKW_VERSION } from "./mkw";

export const DataRegistry = {
  MK8D: mk8d,
  MKW: mkw,
} as const;

export type GameData = (typeof DataRegistry)[keyof typeof DataRegistry];

export const GAME_VERSIONS: Record<Game, string> = { MK8D: MK8D_VERSION, MKW: MKW_VERSION } as const;
