import { useEffect } from "react";
import { useGameData } from "./useGameData";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useGameStore from "@/stores/useGameStore";
import useGeneralStore from "@/stores/useGeneralStore";

export function useInitBuildsListStore() {
  const game = useGameStore((state) => state.game);
  const isSettingsLoaded = useGeneralStore((state) => state.isSettingsLoaded);
  const { buildsListDisplayedInit } = useGameData();

  const initBuildsListDisplayed = useBuildsListStore((state) => state.initBuildsListDisplayed);

  useEffect(() => {
    if (isSettingsLoaded) {
      initBuildsListDisplayed(buildsListDisplayedInit);
    }
  }, [game, isSettingsLoaded]);
}
