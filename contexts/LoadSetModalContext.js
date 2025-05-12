import React, { createContext, useContext, useState } from "react";

const LoadSetModalContext = createContext();

export const LoadSetModalProvider = ({ children }) => {
  const [isLoadSetModalVisible, setIsLoadSetModalVisible] = useState(false);

  const toggleLoadSetModal = (visible) => {
    setIsLoadSetModalVisible(visible);
  };

  return (
    <LoadSetModalContext.Provider
      value={{
        isLoadSetModalVisible,
        toggleLoadSetModal,
      }}
    >
      {children}
    </LoadSetModalContext.Provider>
  );
};

export const useLoadSetModal = () => useContext(LoadSetModalContext);
