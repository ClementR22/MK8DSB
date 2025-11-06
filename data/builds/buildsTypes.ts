import { Bodytype } from "../bodytypes/bodytypesTypes";

export type BuildData = {
  dataId: string;
  classIds: number[];
  stats: number[];
  bodytypes: Bodytype[];
};

export type Build = {
  id: string; // stable unique ID
  dataId: string; // référence vers les stats, etc.
  percentage?: number;
};

export type BuildPersistant = {
  id: string;
  dataId: string;
  name: string;
};
