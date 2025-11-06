import { BuildPersistant } from "@/data/builds/buildsTypes";

export const checkFormatBuildImported = (obj: unknown): obj is BuildPersistant => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return false;
  }

  const importedBuild = obj as Record<string, unknown>;
  const keys = Object.keys(importedBuild);

  const dataIdRegex = /^\d+(?:-\d+){3}$/;
  // signifie : un ou plusieurs chiffres, suivis de 3 répétitions de "-nombre"

  const isCorrectFormat =
    keys.length === 2 && // Exactement 2 clés
    typeof importedBuild.name === "string" &&
    importedBuild.name.trim() !== "" &&
    typeof importedBuild.buildDataId === "string" &&
    dataIdRegex.test(importedBuild.buildDataId);
  return isCorrectFormat;
};
