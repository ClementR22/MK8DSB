export type Category = "character" | "body";

export type SelectedClassIdsByCategory = {
  character: number;
  body: number;
};

export type MultiSelectedClassIdsByCategory = {
  character: Set<number>;
  body: Set<number>;
};
