import { useEffect } from "react";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import { useSettingsMap } from "@/hooks/useSettingsMap";
import useGeneralStore from "@/stores/useGeneralStore";
import { Game } from "@/types";
import useBuildsActionsStore from "@/stores/useBuildsActionsStore";

export const useLoadSettings = () => {
  const settingsMap = useSettingsMap();
  const setIsSettingsLoaded = useGeneralStore((state) => state.setIsSettingsLoaded);
  const loadBuildsSaved = useBuildsActionsStore((state) => state.loadBuildsSaved);

  useEffect(() => {
    const load = async () => {
      let persistedGame: Game;

      for (const [key, { setState }] of Object.entries(settingsMap)) {
        if (key == "game") {
          // récupérer explicitement le game persistant
          persistedGame = await loadThingFromMemory(key, setState);
        } else {
          await loadThingFromMemory(key, setState);
        }
      }

      // charger les builds POUR CE game précis
      loadBuildsSaved(persistedGame);

      setIsSettingsLoaded(true);
    };
    load();
  }, []);
};
