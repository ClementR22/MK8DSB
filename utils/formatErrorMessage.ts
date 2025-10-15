import { translateToLanguage } from "@/translations/translations";

export const formatErrorMessage = (error: unknown, language: string, title: string = "Error"): string => {
  const errorMessage = error instanceof Error ? error.message : "UnknownError";
  return `${translateToLanguage(title, language)}${translateToLanguage(":", language)}${translateToLanguage(
    errorMessage,
    language
  )}`;
};
