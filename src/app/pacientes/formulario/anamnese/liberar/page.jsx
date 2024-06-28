"use client";

import { DadosIniciais } from "@/components/CadastroPacienteAnamnese/DadosIniciais";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import FileIcon from "@/icons/FileIcon.svg";
import { PlusIcon } from "@/icons/PlusIcon.jsx";
import { Button } from "@nextui-org/react";

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

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const paciente = await fetch(`/api/patciente/${data.email}`);
      let response;
      if (!paciente) {
        response = await fetch("/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      const result = await response.json();
      setFormSent(true);
      console.log("Dados enviados com sucesso:", result);
    } catch (error) {
      setFormSent(false);
      console.error("Erro ao enviar formulário:", error);
    }
  };

  const formSuccess = (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
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
              <FormButton label="Liberar Acesso" icon={<FileIcon />} />
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
