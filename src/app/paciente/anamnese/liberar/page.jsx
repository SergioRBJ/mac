"use client";

import { DadosIniciais } from "@/components/CadastroPacienteAnamnese/DadosIniciais";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import FileIcon from "@/icons/FileIcon.svg";
import { PlusIcon } from "@/icons/PlusIcon.jsx";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

import * as z from "zod";

const formularioSchema = z.object({
  nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório." }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." })
    .refine((value) => value.trim() !== "", {
      message: "Email é obrigatório.",
      path: ["email"],
    }),
});

const CadastroPaciente = () => {
  const methods = useForm({
    resolver: zodResolver(formularioSchema),
  });

  const [formSent, setFormSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/paciente/formulario/anamnese/liberar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      setFormSent(true);
      setIsLoading(false);
      console.log("Dados enviados com sucesso:");
    } catch (error) {
      setFormSent(false);
      setTimeout(() => setIsLoading(false), 500);
      console.error("Erro ao enviar formulário:", error);
    }
  };

  const formSuccess = (
    <div className="flex flex-col items-center pt-10">
      <p className="my-4 text-2xl p-2 text-primary">
        Formulário de anamnese liberado para o paciente!
      </p>
      <Button
        className="text-primary border-primary"
        size="lg"
        variant="bordered"
        startContent={<PlusIcon />}
        onClick={() => {
          setFormSent(false);
          methods.reset();
        }}
      >
        Liberar Novo Paciente
      </Button>
    </div>
  );

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO ANAMNESE
      </h1>

      {!formSent ? (
        <FormProvider {...methods}>
          <p className="text-2xl w-[48%] p-2 mt-8 text-primary">
            Dados do Paciente
          </p>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[50%]">
            <DadosIniciais />
            <div className="mt-8 flex justify-center">
              <FormButton
                label="Liberar Acesso"
                icon={isLoading ? <Spinner /> : <FileIcon />}
              />
            </div>
          </form>
        </FormProvider>
      ) : (
        formSuccess
      )}
    </main>
  );
};

export default CadastroPaciente;
