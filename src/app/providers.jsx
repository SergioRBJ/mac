import { NextUIProvider } from "@nextui-org/react";
import { PacienteProvider } from "@/contexts/pacienteContext";
import { ProfissionalProvider } from "@/contexts/profissionalContext";
import { NavegacaoProvider } from "@/contexts/navegacaoContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <PacienteProvider>
        <ProfissionalProvider>
          <NavegacaoProvider>{children}</NavegacaoProvider>
        </ProfissionalProvider>
      </PacienteProvider>
    </NextUIProvider>
  );
}
