interface ImportedSet {
  name: string;
  classIds: number[];
}

export const checkFormatSetImported = (obj: unknown): obj is ImportedSet => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return false;
  }

  const set = obj as Record<string, unknown>;
  const keys = Object.keys(set);

  const isCorrectFormat =
    keys.length === 2 && // Exactement 2 clés
    typeof set.name === "string" &&
    set.name.trim() !== "" &&
    Array.isArray(set.classIds) &&
    set.classIds.length > 0 &&
    set.classIds.every((id) => typeof id === "number");

  if (!isCorrectFormat) {
    throw new Error("IncorrectFormat");
  }

  return isCorrectFormat;
};
