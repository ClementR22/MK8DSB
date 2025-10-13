import { createContext, useContext, useCallback, useMemo } from "react";

interface SetCardsScrollContextType {
  scrollToSetCard: (id: string) => void;
}

const SetCardsScrollContext = createContext<SetCardsScrollContextType | null>(null);

interface SetCardsScrollProviderProps {
  scrollRef: React.RefObject<any>;
  children: React.ReactNode;
}

export const SetCardsScrollProvider: React.FC<SetCardsScrollProviderProps> = ({ scrollRef, children }) => {
  const scrollToSetCard = useCallback(
    (id: string) => {
      if (scrollRef.current?.scrollToSetCard) {
        scrollRef.current.scrollToSetCard(id);
      }
    },
    [scrollRef]
  );

  const contextValue = useMemo<SetCardsScrollContextType>(() => ({ scrollToSetCard }), [scrollToSetCard]);

  return <SetCardsScrollContext.Provider value={contextValue}>{children}</SetCardsScrollContext.Provider>;
};

export const useSetCardsScroll = () => {
  const context = useContext(SetCardsScrollContext);

  // Retourne une fonction no-op si pas dans le Provider
  return context || { scrollToSetCard: () => {} };
};
