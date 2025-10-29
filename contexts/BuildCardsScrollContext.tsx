import { createContext, useContext, useCallback, useMemo } from "react";

interface BuildCardsScrollContextType {
  scrollToBuildCard: (id: string) => void;
}

const BuildCardsScrollContext = createContext<BuildCardsScrollContextType | null>(null);

interface BuildCardsScrollProviderProps {
  scrollRef: React.RefObject<any>;
  children: React.ReactNode;
}

export const BuildCardsScrollProvider: React.FC<BuildCardsScrollProviderProps> = ({ scrollRef, children }) => {
  const scrollToBuildCard = useCallback(
    (id: string) => {
      if (scrollRef.current?.scrollToBuildCard) {
        scrollRef.current.scrollToBuildCard(id);
      }
    },
    [scrollRef]
  );

  const contextValue = useMemo<BuildCardsScrollContextType>(() => ({ scrollToBuildCard }), [scrollToBuildCard]);

  return <BuildCardsScrollContext.Provider value={contextValue}>{children}</BuildCardsScrollContext.Provider>;
};

export const useBuildCardsScroll = () => {
  const context = useContext(BuildCardsScrollContext);

  // Retourne une fonction no-op si pas dans le Provider
  return context || { scrollToBuildCard: () => {} };
};
