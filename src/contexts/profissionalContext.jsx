"use client";

import { createContext, useState, useContext } from "react";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";

const ProfissionalContext = createContext({});

export const ProfissionalProvider = ({ children }) => {
  const router = useRouter();
  const [profissional, setProfissional] = useState();

  const getProfissionalData = async () => {
    if (profissional) {
      return profissional;
    }

    const token = await getToken({
      secret: process.env.NEXTAUTH_JWT_SECRET,
    });

    if (!token) {
      router.push("/profissional/login");
    }

    setProfissional(token);
  };

  return (
    <ProfissionalContext.Provider value={{ getProfissionalData }}>
      {children}
    </ProfissionalContext.Provider>
  );
};

export const useProfissionalContext = () => {
  return useContext(ProfissionalContext);
};
