import { NextUIProvider } from "@nextui-org/react";
import { PacienteWrapper } from "@/contexts/pacienteContext";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <PacienteWrapper>{children}</PacienteWrapper>
    </NextUIProvider>
  );
}
