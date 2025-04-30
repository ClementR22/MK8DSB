import React, { createContext, useContext, useState } from 'react';
import { statNames } from '../data/data';
import { translate } from '../i18n/translations';

const DisplaySetScreenContext = createContext();

export const DisplaySetScreenProvider = ({children}) => {
  const [isStatsVisible, setIsStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: translate(statName),
      checked: true,
    })),
  );

  return (
    <DisplaySetScreenContext.Provider
      value={{isStatsVisible, setIsStatsVisible}}
    >
      {children}
    </DisplaySetScreenContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useDisplaySetScreen = () => {
  return useContext(DisplaySetScreenContext);
};
