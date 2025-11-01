import { create } from "zustand";

interface EditBuildModalState {
  isEditBuildModalVisible: boolean;
  setIsEditBuildModalVisible: (newVisible: boolean) => void;
}

const useEditBuildModalStore = create<EditBuildModalState>((set, get) => ({
  isEditBuildModalVisible: false,
  setIsEditBuildModalVisible: (newVisible) => set({ isEditBuildModalVisible: newVisible }),
}));

export default useEditBuildModalStore;
