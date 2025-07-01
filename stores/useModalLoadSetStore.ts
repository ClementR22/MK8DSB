import { ScreenName } from "@/contexts/ScreenContext";
import { create } from "zustand";

interface ModalLoadSetState {
  isLoadSetModalVisible: boolean;
  setIsLoadSetModalVisible: (visible: boolean) => void;
  screenNameForLoadModal: ScreenName;
  setScreenNameForLoadModal: (newScreenName: ScreenName) => void;
}

export const useModalLoadSetStore = create<ModalLoadSetState>((set) => ({
  isLoadSetModalVisible: false,
  setIsLoadSetModalVisible: (visible: boolean) => set({ isLoadSetModalVisible: visible }),

  screenNameForLoadModal: "search",
  setScreenNameForLoadModal: (newScreenName) => set({ screenNameForLoadModal: newScreenName }),
}));
