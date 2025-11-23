export type Category = "character" | "body" | "wheel" | "glider";

export type SelectedClassIdsByCategory = {
  character: number;
  body: number;
  wheel: number;
  glider: number;
};

export type MultiSelectedClassIdsByCategory = {
  character: Set<number>;
  body: Set<number>;
  wheel: Set<number>;
  glider: Set<number>;
};
