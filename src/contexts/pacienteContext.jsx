"use client";

import { createContext, useState, useContext } from "react";

const PacienteContext = createContext({});

export const PacienteWrapper = ({ children }) => {
  const [paciente, setPaciente] = useState({});

  return (
    <PacienteContext.Provider value={{ paciente, setPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePacienteContext = () => {
  return useContext(PacienteContext);
};
