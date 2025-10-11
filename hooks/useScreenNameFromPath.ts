import { ScreenName } from "@/contexts/ScreenContext";
import { usePathname } from "expo-router";

export const useScreenNameFromPath = (): ScreenName | null => {
  const pathname = usePathname();
  if (pathname === "/") return "search";
  // Using .includes() is less precise, consider exact matches or regex if paths become complex
  // For simplicity, keeping it as is, but be aware of potential false positives (e.g., "save" matches "saved")
  if (pathname.includes("isplay")) return "display";
  if (pathname.includes("ave")) return "save"; // This might match 'save' and 'saved', depending on your exact routes.
  return null;
};
