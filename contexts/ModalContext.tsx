import { createContext, ReactNode, useContext } from "react";

type ModalContextType = {
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProviderProps {
  close: () => void;
  children: ReactNode;
}

export const ModalProvider = ({ close, children }: ModalProviderProps) => {
  return <ModalContext.Provider value={{ close }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  // on ne vérifie pas si useModal est appelé hors du provider
  // on veut autoriser ce cas
  return context;
};
