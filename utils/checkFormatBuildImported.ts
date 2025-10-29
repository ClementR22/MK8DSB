interface ImportedSet {
  name: string;
  classIds: number[];
}

export const checkFormatBuildImported = (obj: unknown): obj is ImportedSet => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return false;
  }

  const build = obj as Record<string, unknown>;
  const keys = Object.keys(build);

  const isCorrectFormat =
    keys.length === 2 && // Exactement 2 clés
    typeof build.name === "string" &&
    build.name.trim() !== "" &&
    Array.isArray(build.classIds) &&
    build.classIds.length > 0 &&
    build.classIds.every((id) => typeof id === "number");

  return isCorrectFormat;
};
