import React, { createContext, useState, useContext } from "react";
import { useSetsList } from "./SetsListContext";

const SavedSetModalContext = createContext();

export const SavedSetModalProvider = ({ children }) => {
  const [savedSetModalVisible, setSavedSetModalVisible] = useState(false);
  const { updateMemory } = useSetsList();

  const toggleSavedSetModal = (visible) => {
    setSavedSetModalVisible(visible);
    if (!visible) {
      updateMemory();
    }
  };

  return (
    <SavedSetModalContext.Provider
      value={{
        savedSetModalVisible,
        toggleSavedSetModal,
      }}
    >
      {children}
    </SavedSetModalContext.Provider>
  );
};

export const useSavedSetModal = () => useContext(SavedSetModalContext);
