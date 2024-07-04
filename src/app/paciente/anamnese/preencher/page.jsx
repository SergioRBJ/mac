"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PatientIcon from "@/icons/PatientIcon.svg";
import { Button, Spinner } from "@nextui-org/react";
import * as z from "zod";
import { usePacienteContext } from "@/contexts/pacienteContext";
import { useNavegacaoContext } from "@/contexts/navegacaoContext";
import { useState } from "react";

const formularioSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." })
    .refine((value) => value.trim() !== "", {
      message: "Email é obrigatório.",
      path: ["email"],
    }),
});

const CadastroPaciente = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formularioSchema),
  });
  const { setPaciente } = usePacienteContext();
  const { setNavegacaoValida } = useNavegacaoContext();
  const [errorAPI, setErrorAPI] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorAPI(null);
    try {
      const response = await fetch(`/api/paciente/${data.email}`);

      const result = await response.json();
      if (!response.ok) {
        setErrorAPI("Formulário ainda não liberado para este paciente.");
        setIsLoading(false);
        return;
      } else if (!result.data.metadados.responderFormularioAnamnese) {
        setErrorAPI("Formulário ainda não liberado para este paciente.");
        setIsLoading(false);
        return;
      }

      setPaciente(result.data);
      setNavegacaoValida("/paciente/anamnese/preencher");

      setIsLoading(false);

      router.push(`/paciente/anamnese/formulario`);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO DE ANAMNESE
      </h1>
      <div className="mt-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="mb-6">
            <Input
              fullWidth
              placeholder="Email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          {errorAPI && <span className="text-red-500 mb-2">{errorAPI}</span>}
          <Button
            className="text-primary border-primary"
            size="lg"
            variant="bordered"
            startContent={isLoading ? <Spinner /> : <PatientIcon />}
            type="submit"
          >
            Preencher Formulário
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CadastroPaciente;
