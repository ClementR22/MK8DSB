// usePressableElementsStore.ts
import { create } from "zustand";
import { Category } from "@/types";

type SelectedClassIdsByCategory = {
  character: number;
  body: number;
  wheel: number;
  glider: number;
};

type MultiSelectedClassIdsByCategory = {
  character: Set<number>;
  body: Set<number>;
  wheel: Set<number>;
  glider: Set<number>;
};

interface PressableElementsState {
  selectedClassIdsByCategory: SelectedClassIdsByCategory;
  multiSelectedClassIdsByCategory: MultiSelectedClassIdsByCategory;
  getSelectedClassIds: (
    selectionMode: "single" | "multiple"
  ) => SelectedClassIdsByCategory | MultiSelectedClassIdsByCategory;

  isBuildsListUpdated: boolean;
  setIsBuildsListUpdated: (newIsBuildsListUpdated: boolean) => void;

  updateSelectionFromBuild: (classIds: number[], categories: Category[]) => void;

  selectElementsByClassId: (category: Category, classId: number) => void;
  toggleMultiSelectElementsByClassId: (category: Category, elementId: number) => void;
}

const defaultSingleSelection: SelectedClassIdsByCategory = { character: 9, body: 16, wheel: 30, glider: 39 };
const defaultMultiSelection: MultiSelectedClassIdsByCategory = {
  character: new Set(),
  body: new Set(),
  wheel: new Set(),
  glider: new Set(),
};

const usePressableElementsStore = create<PressableElementsState>((set, get) => ({
  selectedClassIdsByCategory: { ...defaultSingleSelection },
  multiSelectedClassIdsByCategory: { ...defaultMultiSelection },

  getSelectedClassIds: (selectionMode) => {
    if (selectionMode === "single") {
      return get().selectedClassIdsByCategory;
    } else {
      return get().multiSelectedClassIdsByCategory;
    }
  },

  isBuildsListUpdated: true,

  setIsBuildsListUpdated: (newIsBuildsListUpdated) => {
    set({ isBuildsListUpdated: newIsBuildsListUpdated });
  },

  updateSelectionFromBuild: (classIds, categories) => {
    set((state) => {
      const newSelected: SelectedClassIdsByCategory = {
        character: null,
        body: null,
        wheel: null,
        glider: null,
      };

      categories.forEach((catName, index) => {
        newSelected[catName as Category] = classIds[index];
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
        isBuildsListUpdated: false,
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
