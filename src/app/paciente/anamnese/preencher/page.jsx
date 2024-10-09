"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { Input, Button, Spinner } from "@nextui-org/react";
import PatientIcon from "@/icons/PatientIcon.svg";
import { usePacienteContext } from "@/contexts/pacienteContext";
import { useNavegacaoContext } from "@/contexts/navegacaoContext";

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

      router.push(`/paciente/anamnese/ficha`);
    } catch (error) {
      console.error("Erro ao enviar ficha:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/static/img/docs.png')" }}
      ></div>
      <main className="flex flex-col items-center justify-center w-1/2 p-10">
        <h1 className="text-5xl text-center w-full text-primary mb-4">
          Ficha de Anamnese
        </h1>
        <p className="text-lg text-center w-full text-primary px-24">
          Olá, paciente! Por favor, preencha o campo abaixo com o email que você
          forneceu ao doutor.
        </p>
        <div className="mt-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md"
          >
            <div className="mb-6 w-full">
              <Input
                className="border-primary border-2 rounded-xl w-full"
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
              className="text-primary border-primary w-full"
              size="lg"
              variant="bordered"
              startContent={isLoading ? <Spinner /> : <PatientIcon />}
              type="submit"
            >
              Preencher Ficha
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CadastroPaciente;
