// usePressableElementsStore.ts
import { create } from "zustand";
import { categories } from "@/data/elements/elementsData";
import { Category } from "@/data/elements/elementsTypes";

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

  selectElementsByClassId: (category: Category, classId: number) => void;
  toggleMultiSelectElementsByClassId: (category: Category, elementId: number) => void;
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
    set((state) => {
      const newSelected: SelectedClassIds = {
        character: null,
        body: null,
        wheel: null,
        glider: null,
      };

      categories.forEach((catName, index) => {
        newSelected[catName as Category] = setClassIds[index];
      });

      const areEqual =
        state.selectedClassIds.character === newSelected.character &&
        state.selectedClassIds.body === newSelected.body &&
        state.selectedClassIds.wheel === newSelected.wheel &&
        state.selectedClassIds.glider === newSelected.glider;

      // Mettre à jour l'état UNIQUEMENT si le contenu a changé
      if (!areEqual) {
        return {
          selectedClassIds: newSelected,
        };
      } else {
        return {}; // pour dire qu'il n'y a aucun changement
      }
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
