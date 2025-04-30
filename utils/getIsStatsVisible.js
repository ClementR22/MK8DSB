import { useDisplaySetScreen } from "./DisplaySetScreenContext";
import { useSavedSetScreen } from "./SavedSetScreenContext";
import { useSearchSetScreen } from "./SearchSetScreenContext";

export const getIsStatsVisible = (situation) => {
  let isStatsVisible;
  switch (situation) {
    case "search":
      isStatsVisible = useSearchSetScreen().isStatsVisible;
      break;
    case "display":
      isStatsVisible = useDisplaySetScreen().isStatsVisible;
      break;
    case "save":
      isStatsVisible = useSavedSetScreen().isStatsVisible;
      break;
    default:
      isStatsVisible = null; // ou autre valeur par défaut
  }
  return isStatsVisible;
};
