import { BuildPersistant } from "@/types";

export const checkFormatBuildImported = (obj: unknown): obj is BuildPersistant => {
  if (typeof obj !== "object" || Array.isArray(obj) || obj === null) {
    return false;
  }

  const importedBuild = obj as BuildPersistant;
  const keys = Object.keys(importedBuild);

  const dataIdRegex = /^(?:\d+(?:-\d+){1}|\d+(?:-\d+){3})$/;

  return (
    keys.length === 2 &&
    typeof importedBuild.name === "string" &&
    importedBuild.name.trim() !== "" &&
    typeof importedBuild.buildDataId === "string" &&
    dataIdRegex.test(importedBuild.buildDataId)
  );
};
