interface ImportedBuild {
  name: string;
  dataId: string;
}

export const checkFormatBuildImported = (obj: unknown): obj is ImportedBuild => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return false;
  }

  const build = obj as Record<string, unknown>;
  const keys = Object.keys(build);

  const dataIdRegex = /^\d+(?:-\d+){3}$/;
  // signifie : un ou plusieurs chiffres, suivis de 3 répétitions de "-nombre"

  const isCorrectFormat =
    keys.length === 2 && // Exactement 2 clés
    typeof build.name === "string" &&
    build.name.trim() !== "" &&
    typeof build.dataId === "string" &&
    dataIdRegex.test(build.dataId);
  return isCorrectFormat;
};
