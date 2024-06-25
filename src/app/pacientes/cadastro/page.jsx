"use client";

import { DadosIniciais } from "@/components/CadastroPacienteAnamnese/DadosIniciais";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import PatientIcon from "@/icons/PatientIcon.svg";
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
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
    <div className="flex flex-col items-center pt-10">
      <p className="my-4 text-2xl p-2 text-primary">
        Cadastro de paciente realizado com sucesso!
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
        Cadastrar Novo Paciente
      </Button>
    </div>
  );

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        CADASTRO DE PACIENTE
      </h1>

      {!formSent ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[50%]">
            <DadosIniciais />
            <div className="my-8 flex justify-center">
              <FormButton label="Cadastrar Paciente" icon={<PatientIcon />} />
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
