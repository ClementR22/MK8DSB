import { useEffect } from "react";
import { useGameData } from "./useGameData";
import useBuildsListStore from "@/stores/useBuildsListStore";

export function useInitBuildsListStore() {
  const { buildsListDisplayedInit } = useGameData();
  console.log("buildsListDisplayedInit", buildsListDisplayedInit);
  const initBuildsListDisplayed = useBuildsListStore((s) => s.initBuildsListDisplayed);

  useEffect(() => {
    initBuildsListDisplayed(buildsListDisplayedInit);
  }, [buildsListDisplayedInit]);
}
