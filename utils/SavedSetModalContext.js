import React, { createContext, useState, useContext } from "react";

const SavedSetModalContext = createContext();

export const SavedSetModalProvider = ({ children }) => {
  const [savedSetModalVisible, setSavedSetModalVisible] = useState(false);

  const toggleSavedSetModal = (visible) => {
    setSavedSetModalVisible(visible);
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
