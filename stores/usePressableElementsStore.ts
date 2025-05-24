import { create } from "zustand";
import { bodyTypeNames, category4Names, elementsAllInfosList } from "@/data/data";
import { ScreenName } from "@/contexts/ScreenContext";

// --- Types ---
type ElementCategory = string; // tu peux le raffiner si tu veux un enum (ex: "character" | "body" | etc.)

export type PressableElement = {
  id: number;
  name: string;
  category: ElementCategory;
  classId: number;
  image: string;
  pressed: boolean;
};

type PressedClassIds = {
  character: number;
  body: number;
  wheels: number;
  glider: number;
};

export type PressableElementsStore = {
  pressableElementsListByScreen: Record<ScreenName, PressableElement[]>;
  pressedClassIdsObjByScreen: Record<ScreenName, PressedClassIds>;
  setPressedClassIdsObjByScreen: (screenName: ScreenName, setToShowClassIds: number[]) => void;
  isSetsListUpdated: boolean;
  setIsSetsListUpdated: (newIsSetsListUpdated: boolean) => void;
  handlePressImage: (screenName: ScreenName, id: number) => void;
  handlePressImageByClass: (screenName: ScreenName, classId: number, category7: string) => void;
  updatePressableElementsList: (screenName: ScreenName, setClassIds: number[]) => void;
};

// --- Initialisation ---
const createPressableElementsList = (): PressableElement[] =>
  elementsAllInfosList.map(({ id, name, category, classId, image }) => ({
    id,
    name,
    category,
    classId,
    image,
    pressed: false,
  }));

// --- Zustand store ---
const usePressableElementsStore = create<PressableElementsStore>((set, get) => ({
  pressableElementsListByScreen: {
    search: createPressableElementsList(),
    display: createPressableElementsList(),
    save: createPressableElementsList(),
    gallery: createPressableElementsList(),
  },

  pressedClassIdsObjByScreen: {
    search: { character: 0, body: 0, wheels: 0, glider: 0 },
    display: { character: 0, body: 0, wheels: 0, glider: 0 },
    save: { character: 0, body: 0, wheels: 0, glider: 0 },
    gallery: { character: 0, body: 0, wheels: 0, glider: 0 },
  },

  isSetsListUpdated: true,

  setIsSetsListUpdated: (newIsSetsListUpdated) => {
    set({ isSetsListUpdated: newIsSetsListUpdated });
  },

  setPressedClassIdsObjByScreen: (screenName, setToShowClassIds) => {
    const newPressedClassIdsObj = Object.fromEntries(
      category4Names.map((category, index) => [category, setToShowClassIds[index]])
    );
    set((state) => ({
      pressedClassIdsObjByScreen: {
        ...state.pressedClassIdsObjByScreen,
        [screenName]: newPressedClassIdsObj,
      },
    }));
  },

  handlePressImage: (screenName, id) => {
    const pressableElementsList = get().pressableElementsListByScreen[screenName];
    const newList = pressableElementsList.map((item, index) =>
      index === id ? { ...item, pressed: !item.pressed } : item
    );

    set((state) => ({
      pressableElementsListByScreen: {
        ...state.pressableElementsListByScreen,
        [screenName]: newList,
      },
    }));
  },

  handlePressImageByClass: (screenName, classId, category7) => {
    const pressableElementsList = get().pressableElementsListByScreen[screenName];

    let category4 = category7;
    let category4List = [category7];

    if (bodyTypeNames.includes(category7)) {
      category4 = "body";
      category4List = bodyTypeNames;
    }

    const newPressableElementsList = pressableElementsList.map((item) =>
      category4List.includes(item.category) ? { ...item, pressed: item.classId === classId } : item
    );

    set((state) => ({
      pressableElementsListByScreen: {
        ...state.pressableElementsListByScreen,
        [screenName]: newPressableElementsList,
      },
    }));

    const pressedClassIdsObj = get().pressedClassIdsObjByScreen[screenName];
    const newPressedClassIdsObj = {
      ...pressedClassIdsObj,
      [category4]: classId,
    };

    set((state) => ({
      pressedClassIdsObjByScreen: {
        ...state.pressedClassIdsObjByScreen,
        [screenName]: newPressedClassIdsObj,
      },
    }));

    set({ isSetsListUpdated: false });
  },

  updatePressableElementsList: (screenName, setClassIds) => {
    const pressableElementsList = get().pressableElementsListByScreen[screenName];
    const newPressableElementsList = pressableElementsList.map((item) => ({
      ...item,
      pressed: setClassIds.includes(item.classId),
    }));

    set((state) => ({
      pressableElementsListByScreen: {
        ...state.pressableElementsListByScreen,
        [screenName]: newPressableElementsList,
      },
    }));
  },
}));

export default usePressableElementsStore;
