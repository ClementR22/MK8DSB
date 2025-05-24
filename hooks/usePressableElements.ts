import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";

export function usePressableElements(screenNameFromProps) {
  const contextScreenName: ScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const pressableElementsList = usePressableElementsStore((s) => s.pressableElementsListByScreen[screenName]);
  const pressedClassIdsObj = usePressableElementsStore((s) => s.pressedClassIdsObjByScreen[screenName]);
  const isSetsListUpdated = usePressableElementsStore((s) => s.isSetsListUpdated);
  const setIsSetsListUpdated = usePressableElementsStore((s) => s.setIsSetsListUpdated);
  const setPressedClassIdsObjByScreen = usePressableElementsStore((s) => s.setPressedClassIdsObjByScreen);
  const handlePressImage = usePressableElementsStore((s) => s.handlePressImage);
  const handlePressImageByClass = usePressableElementsStore((s) => s.handlePressImageByClass);
  const updatePressableElementsList = usePressableElementsStore((s) => s.updatePressableElementsList);

  return {
    pressableElementsList,
    pressedClassIdsObj,
    isSetsListUpdated,
    setIsSetsListUpdated,
    setPressedClassIdsObj: (setToShowClassIds: number[]) =>
      setPressedClassIdsObjByScreen(screenName, setToShowClassIds),
    handlePressImage: (id: number) => handlePressImage(screenName, id),
    handlePressImageByClass: (classId: number, category7: string) =>
      handlePressImageByClass(screenName, classId, category7),
    updatePressableElementsList: (setClassIds: number[]) => updatePressableElementsList(screenName, setClassIds),
  };
}
