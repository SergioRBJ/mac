"use client";

import { createContext, useContext, useState } from "react";

const NavegacaoContext = createContext();

export const NavegacaoProvider = ({ children }) => {
  const [navegacaoValida, setNavegacaoValida] = useState(false);

  return (
    <NavegacaoContext.Provider value={{ navegacaoValida, setNavegacaoValida }}>
      {children}
    </NavegacaoContext.Provider>
  );
};

export const useNavegacaoContext = () => useContext(NavegacaoContext);
