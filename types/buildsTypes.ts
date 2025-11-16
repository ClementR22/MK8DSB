import { Bodytype } from "./bodytypesTypes";

export type BuildData = {
  buildDataId: string;
  classIds: number[];
  stats: number[];
  bodytypes: Bodytype[];
};

export type Build = {
  buildDataId: string; // référence vers les stats, etc.
  percentage?: number;
};

export type BuildPersistant = {
  buildDataId: string;
  name: string;
};
