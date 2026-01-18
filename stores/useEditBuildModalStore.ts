import { create } from "zustand";

interface EditBuildModalState {
  isEditBuildModalVisible: boolean;
  setIsEditBuildModalVisible: (newVisible: boolean) => void;
  openEditBuildModal: () => void;
}

const useEditBuildModalStore = create<EditBuildModalState>((set, get) => ({
  isEditBuildModalVisible: false,
  setIsEditBuildModalVisible: (newVisible) => set({ isEditBuildModalVisible: newVisible }),
  openEditBuildModal: () => set({ isEditBuildModalVisible: true }),
}));

export default useEditBuildModalStore;
