import { useEffect } from "react";
import { useGameData } from "./useGameData";
import useBuildsListStore from "@/stores/useBuildsListStore";

export function useInitBuildsListStore() {
  const { buildsListDisplayedInit } = useGameData();

  const initBuildsListDisplayed = useBuildsListStore((s) => s.initBuildsListDisplayed);

  useEffect(() => {
    initBuildsListDisplayed(buildsListDisplayedInit);
  }, [buildsListDisplayedInit]);
}
