import { NextUIProvider } from "@nextui-org/react";
import { PacienteProvider } from "@/contexts/pacienteContext";
import { NavegacaoProvider } from "@/contexts/navegacaoContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <PacienteProvider>
        <NavegacaoProvider>{children}</NavegacaoProvider>
      </PacienteProvider>
    </NextUIProvider>
  );
}
