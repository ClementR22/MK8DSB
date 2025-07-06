// usePressableElementsStore.ts
import { create } from "zustand";
import { categories } from "@/data/elements/elementsData";
import { Category } from "@/data/elements/elementsTypes";

export type selectedClassIdsByCategory = {
  character: number;
  body: number;
  wheel: number;
  glider: number;
};

export type multiSelectedClassIdsByCategory = {
  character: Set<number>;
  body: Set<number>;
  wheel: Set<number>;
  glider: Set<number>;
};

export type PressableElementsStore = {
  selectedClassIdsByCategory: selectedClassIdsByCategory;
  multiSelectedClassIdsByCategory: multiSelectedClassIdsByCategory;
  getSelectedClassIds: (
    selectionMode: "single" | "multiple"
  ) => selectedClassIdsByCategory | multiSelectedClassIdsByCategory;

  isSetsListUpdated: boolean;
  setIsSetsListUpdated: (newIsSetsListUpdated: boolean) => void;

  updateSelectionFromSet: (setClassIds: number[]) => void;

  selectElementsByClassId: (category: Category, classId: number) => void;
  toggleMultiSelectElementsByClassId: (category: Category, elementId: number) => void;
};

const defaultSingleSelection: selectedClassIdsByCategory = { character: 9, body: 16, wheel: 30, glider: 39 };
const defaultMultiSelection: multiSelectedClassIdsByCategory = {
  character: new Set(),
  body: new Set(),
  wheel: new Set(),
  glider: new Set(),
};

const usePressableElementsStore = create<PressableElementsStore>((set, get) => ({
  selectedClassIdsByCategory: { ...defaultSingleSelection },
  multiSelectedClassIdsByCategory: { ...defaultMultiSelection },

  getSelectedClassIds: (selectionMode) => {
    if (selectionMode === "single") {
      return get().selectedClassIdsByCategory;
    } else {
      return get().multiSelectedClassIdsByCategory;
    }
  },

  isSetsListUpdated: true,

  setIsSetsListUpdated: (newIsSetsListUpdated) => {
    set({ isSetsListUpdated: newIsSetsListUpdated });
  },

  updateSelectionFromSet: (setClassIds) => {
    set((state) => {
      const newSelected: selectedClassIdsByCategory = {
        character: null,
        body: null,
        wheel: null,
        glider: null,
      };

      categories.forEach((catName, index) => {
        newSelected[catName as Category] = setClassIds[index];
      });

      const areEqual =
        state.selectedClassIdsByCategory.character === newSelected.character &&
        state.selectedClassIdsByCategory.body === newSelected.body &&
        state.selectedClassIdsByCategory.wheel === newSelected.wheel &&
        state.selectedClassIdsByCategory.glider === newSelected.glider;

      // Mettre à jour l'état UNIQUEMENT si le contenu a changé
      if (!areEqual) {
        return {
          selectedClassIdsByCategory: newSelected,
        };
      } else {
        return {}; // pour dire qu'il n'y a aucun changement
      }
    });
  },

  selectElementsByClassId: (category, classId) => {
    set((state) => {
      const currentSelected = state.selectedClassIdsByCategory;

      return {
        selectedClassIdsByCategory: {
          ...currentSelected,
          [category]: classId,
        },
        isSetsListUpdated: false,
      };
    });
  },

  toggleMultiSelectElementsByClassId: (category, classId) => {
    set((state) => {
      const newMultiSelectedClassIdsByCategory = { ...state.multiSelectedClassIdsByCategory };

      const newCategorySet = new Set(newMultiSelectedClassIdsByCategory[category]);

      if (newCategorySet.has(classId)) {
        newCategorySet.delete(classId);
      } else {
        newCategorySet.add(classId);
      }

      newMultiSelectedClassIdsByCategory[category] = newCategorySet;

      return {
        multiSelectedClassIdsByCategory: newMultiSelectedClassIdsByCategory,
      };
    });
  },
}));

export default usePressableElementsStore;
