import { useGameData } from "./useGameData";
import useBuildsListStore, { MAX_NUMBER_BUILDS_DISPLAY } from "@/stores/useBuildsListStore";
import { getRandomDataId } from "@/utils/getRandomDataId";

export function useBuildController() {
  const { numberOfElementsByCategory } = useGameData();
  const addBuild = useBuildsListStore((s) => s.addRandomBuildInDisplay);
  const buildsListDisplayed = useBuildsListStore((s) => s.buildsListDisplayed);

  function addRandomBuildInDisplay() {
    if (buildsListDisplayed.length >= MAX_NUMBER_BUILDS_DISPLAY) {
      throw new Error("buildLimitReached");
    }

    const build = getRandomDataId(numberOfElementsByCategory);
    addBuild(build);
  }

  return { addRandomBuildInDisplay };
}
