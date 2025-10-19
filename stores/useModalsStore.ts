import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface ModalsStoreState {
  isEditModalVisible: boolean;
  setIsEditModalVisible: (newVisible: boolean) => void;
}

const useModalsStore = create<ModalsStoreState>((set, get) => ({
  isEditModalVisible: false,
  setIsEditModalVisible: (newVisible) => set({ isEditModalVisible: newVisible }),
}));

export default useModalsStore;
