import { create } from "zustand";
import { bodyTypeNames, elementsAllInfosList } from "@/data/data";
import { useMemo } from "react";

// --- Types ---
type ElementCategory = string; // tu peux le raffiner si tu veux un enum (ex: "character" | "body" | etc.)

export type PressableImage = {
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

type ScreenName = "search" | "display" | "save" | "gallery";

type ScreenState = {
  pressableImagesList: PressableImage[];
  pressedClassIds?: PressedClassIds;
};

type PressableElementsStore = {
  statesByScreen: Record<ScreenName, ScreenState>;
  handlePressImage: (screenName: ScreenName, id: number) => void;
  handlePressImageByClass: (screenName: ScreenName, classId: number, category7: string) => void;
  updatePressableImagesList: (screenName: ScreenName, setClassIds: number[]) => void;
};

// --- Initialisation ---
const createPressableImagesList = (): PressableImage[] =>
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
  statesByScreen: {
    search: {
      pressableImagesList: createPressableImagesList(),
      pressedClassIds: {
        character: 9,
        body: 16,
        wheels: 30,
        glider: 39,
      },
    },
    display: {
      pressableImagesList: createPressableImagesList(),
      pressedClassIds: {
        character: 9,
        body: 16,
        wheels: 30,
        glider: 39,
      },
    },
    save: {
      pressableImagesList: createPressableImagesList(),
      pressedClassIds: {
        character: 9,
        body: 16,
        wheels: 30,
        glider: 39,
      },
    },
    gallery: {
      pressableImagesList: createPressableImagesList(),
    },
  },

  handlePressImage: (screenName, id) => {
    const screen = get().statesByScreen[screenName];
    if (!screen) return;

    const newList = screen.pressableImagesList.map((item, index) =>
      index === id ? { ...item, pressed: !item.pressed } : item
    );

    set((state) => ({
      statesByScreen: {
        ...state.statesByScreen,
        [screenName]: {
          ...screen,
          pressableImagesList: newList,
        },
      },
    }));
  },

  handlePressImageByClass: (screenName, classId, category7) => {
    const screen = get().statesByScreen[screenName];
    if (!screen || !screen.pressedClassIds) return;

    let category4 = category7;
    let category4ElementList = [category7];

    if (bodyTypeNames.includes(category7)) {
      category4 = "body";
      category4ElementList = bodyTypeNames;
    }

    const newList = screen.pressableImagesList.map((item) =>
      category4ElementList.includes(item.category) ? { ...item, pressed: item.classId === classId } : item
    );

    const newPressedClassIds = {
      ...screen.pressedClassIds,
      [category4]: classId,
    };

    set((state) => ({
      statesByScreen: {
        ...state.statesByScreen,
        [screenName]: {
          ...screen,
          pressableImagesList: newList,
          pressedClassIds: newPressedClassIds,
        },
      },
    }));
  },

  updatePressableImagesList: (screenName, setClassIds: number[]) => {
    const screen = get().statesByScreen[screenName];
    if (!screen) return;

    const newList = screen.pressableImagesList.map((item) => ({
      ...item,
      pressed: setClassIds.includes(item.classId),
    }));

    set((state) => ({
      statesByScreen: {
        ...state.statesByScreen,
        [screenName]: {
          ...screen,
          pressableImagesList: newList,
        },
      },
    }));
  },
}));

export default usePressableElementsStore;
