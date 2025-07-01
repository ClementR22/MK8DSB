// usePressableElementsStore.ts
import { create } from "zustand";
import { category4Names } from "@/data/data";
import { CategoryKey } from "@/data/elementsTypes";

export type SelectedClassIds = {
  character: number;
  body: number;
  wheel: number;
  glider: number;
};

export type MultiSelectedClassIds = {
  character: Set<number>;
  body: Set<number>;
  wheel: Set<number>;
  glider: Set<number>;
};

export type PressableElementsStore = {
  selectedClassIds: SelectedClassIds;
  multiSelectedClassIds: MultiSelectedClassIds;
  getSelectedClassIds: (selectionMode: "single" | "multiple") => SelectedClassIds | MultiSelectedClassIds;

  isSetsListUpdated: boolean;
  setIsSetsListUpdated: (newIsSetsListUpdated: boolean) => void;

  updateSelectionFromSet: (setClassIds: number[]) => void;

  selectElementsByClassId: (category: CategoryKey, classId: number) => void;
  toggleMultiSelectElementsByClassId: (category: CategoryKey, elementId: number) => void;
};

const defaultSingleSelection: SelectedClassIds = { character: 9, body: 16, wheel: 30, glider: 39 };
const defaultMultiSelection: MultiSelectedClassIds = {
  character: new Set(),
  body: new Set(),
  wheel: new Set(),
  glider: new Set(),
};

const usePressableElementsStore = create<PressableElementsStore>((set, get) => ({
  selectedClassIds: { ...defaultSingleSelection },
  multiSelectedClassIds: { ...defaultMultiSelection },

  getSelectedClassIds: (selectionMode) => {
    if (selectionMode === "single") {
      return get().selectedClassIds;
    } else {
      return get().multiSelectedClassIds;
    }
  },

  isSetsListUpdated: true,

  setIsSetsListUpdated: (newIsSetsListUpdated) => {
    set({ isSetsListUpdated: newIsSetsListUpdated });
  },

  updateSelectionFromSet: (setClassIds) => {
    set(() => {
      const newSelected: SelectedClassIds = {
        character: null,
        body: null,
        wheel: null,
        glider: null,
      };

      category4Names.forEach((catName, index) => {
        newSelected[catName as CategoryKey] = setClassIds[index];
      });

      return {
        selectedClassIds: newSelected,
        isSetsListUpdated: false,
      };
    });
  },

  selectElementsByClassId: (category, classId) => {
    set((state) => {
      const currentSelected = state.selectedClassIds;

      return {
        selectedClassIds: {
          ...currentSelected,
          [category]: classId,
        },
        isSetsListUpdated: false,
      };
    });
  },

  toggleMultiSelectElementsByClassId: (category, classId) => {
    set((state) => {
      const newMultiSelectedClassIds = { ...state.multiSelectedClassIds };

      const newCategorySet = new Set(newMultiSelectedClassIds[category]);

      if (newCategorySet.has(classId)) {
        newCategorySet.delete(classId);
      } else {
        newCategorySet.add(classId);
      }

      newMultiSelectedClassIds[category] = newCategorySet;

      return {
        multiSelectedClassIds: newMultiSelectedClassIds,
      };
    });
  },
}));

export default usePressableElementsStore;
