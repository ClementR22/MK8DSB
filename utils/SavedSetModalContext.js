import React, { createContext, useState, useContext } from "react";

const SavedSetModalContext = createContext();

export const SavedSetModalProvider = ({ children }) => {
  const [savedSetModalVisible, setSavedSetModalVisible] = useState(false);

  const [situation, setSituation] = useState("search");
  const [screenSituation, setScreenSituation] = useState("search");

  const toggleSavedSetModal = (visible) => {
    setSavedSetModalVisible(visible);
    setSituation(visible ? "save" : screenSituation);
  };

  return (
    <SavedSetModalContext.Provider
      value={{
        savedSetModalVisible,
        toggleSavedSetModal,
        situation,
        screenSituation,
        setScreenSituation,
      }}
    >
      {children}
    </SavedSetModalContext.Provider>
  );
};

export const useSavedSetModal = () => useContext(SavedSetModalContext);
