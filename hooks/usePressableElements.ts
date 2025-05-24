import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { useScreen } from "@/contexts/ScreenContext";
import { PressableElementsStore } from "@/stores/usePressableElementsStore";
import { ScreenName } from "@/stores/usePressableElementsStore";

export function usePressableElements() {
  const screenName: ScreenName = useScreen().screenName;
  const store: PressableElementsStore = usePressableElementsStore();

  return {
    pressableElementsList: store.pressableElementsListByScreen[screenName],
    pressedClassIdsObj: store.pressedClassIdsObjByScreen[screenName],
    setPressedClassIdsObj: (setToShowClassIds: number[]) =>
      store.setPressedClassIdsObjByScreen(screenName, setToShowClassIds),
    handlePressImage: (id: number) => store.handlePressImage(screenName, id),
    handlePressImageByClass: (classId: number, category7: string) =>
      store.handlePressImageByClass(screenName, classId, category7),
    updatePressableElementsList: (setClassIds: number[]) => store.updatePressableElementsList(screenName, setClassIds),
    isSetsListUpdated: store.isSetsListUpdated,
    setIsSetsListUpdated: store.setIsSetsListUpdated,
  };
}
