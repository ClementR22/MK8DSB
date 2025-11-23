import { useEffect } from "react";
import { useGameData } from "./useGameData";
import usePressableElementsStore from "@/stores/usePressableElementsStore";

export function useInitPressableElementsStore() {
  const { selectedClassIdsByCategoryInit, multiSelectedClassIdsByCategoryInit } = useGameData();

  const initSingleAndMultiSelectedClassIdsByCategory = usePressableElementsStore(
    (s) => s.initSingleAndMultiSelectedClassIdsByCategory
  );

  useEffect(() => {
    initSingleAndMultiSelectedClassIdsByCategory(selectedClassIdsByCategoryInit, multiSelectedClassIdsByCategoryInit);
  }, [selectedClassIdsByCategoryInit]);
}
