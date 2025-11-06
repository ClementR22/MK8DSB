import { Bodytype } from "../bodytypes/bodytypesTypes";

export type BuildData = {
  dataId: string;
  classIds: number[];
  stats: number[];
  bodytypes: Bodytype[];
};

export type Build = {
  dataId: string; // référence vers les stats, etc.
  percentage?: number;
};

export type BuildPersistant = {
  dataId: string;
  name: string;
};
