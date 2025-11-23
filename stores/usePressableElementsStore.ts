// usePressableElementsStore.ts
import { create } from "zustand";
import { Category, SelectedClassIdsByCategory, MultiSelectedClassIdsByCategory } from "@/types";

interface PressableElementsState {
  selectedClassIdsByCategory: SelectedClassIdsByCategory;
  multiSelectedClassIdsByCategory: MultiSelectedClassIdsByCategory;

  initSingleAndMultiSelectedClassIdsByCategory: (
    selectedClassIdsByCategoryInit: SelectedClassIdsByCategory,
    multiSelectedClassIdsByCategoryInit: MultiSelectedClassIdsByCategory
  ) => void;

  getSelectedClassIds: (
    selectionMode: "single" | "multiple"
  ) => SelectedClassIdsByCategory | MultiSelectedClassIdsByCategory;

  isBuildsListUpdated: boolean;
  setIsBuildsListUpdated: (newIsBuildsListUpdated: boolean) => void;

  updateSelectionFromBuild: (classIds: number[], categories: Category[]) => void;

  selectElementsByClassId: (category: Category, classId: number) => void;
  toggleMultiSelectElementsByClassId: (category: Category, elementId: number) => void;
}

const usePressableElementsStore = create<PressableElementsState>((set, get) => ({
  selectedClassIdsByCategory: null,
  multiSelectedClassIdsByCategory: null,

  initSingleAndMultiSelectedClassIdsByCategory: (
    selectedClassIdsByCategoryInit,
    multiSelectedClassIdsByCategoryInit
  ) => {
    set({
      selectedClassIdsByCategory: selectedClassIdsByCategoryInit,
      multiSelectedClassIdsByCategory: multiSelectedClassIdsByCategoryInit,
    });
  },

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
      const newSelected: SelectedClassIdsByCategory = state.selectedClassIdsByCategory; // just of initialization

      categories.forEach((catName, index) => {
        newSelected[catName as Category] = classIds[index];
      });

      const selectedClassIdsByCategory = state.selectedClassIdsByCategory;

      const areEqual = Object.entries(selectedClassIdsByCategory).every(
        ([categoryKey, categoryValue]) => newSelected[categoryKey] === categoryValue
      );

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
