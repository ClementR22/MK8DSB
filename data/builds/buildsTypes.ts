export type BuildData = {
  id: string;
  classIds: number[];
  stats: number[];
  bodytypes: string[];
};

export type Build = {
  id: string; // stable unique ID
  dataId: string; // référence vers les stats, etc.
  percentage?: number;
};
