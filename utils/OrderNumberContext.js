import React, { createContext, useContext, useState } from 'react';

const OrderNumberContext = createContext();

export const OrderNumberProvider = ({children}) => {
  const [orderNumber, setOrderNumber] = useState(0);

  return (
    <OrderNumberContext.Provider
      value={{
        orderNumber,
        setOrderNumber,
      }}
    >
      {children}
    </OrderNumberContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useOrderNumber = () => {
  return useContext(OrderNumberContext);
};
