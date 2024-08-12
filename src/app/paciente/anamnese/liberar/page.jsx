"use client";

import { DadosIniciais } from "@/components/CadastroPacienteAnamnese/DadosIniciais";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import FileIcon from "@/icons/FileIcon.svg";
import { PlusIcon } from "@/icons/PlusIcon.jsx";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
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
  const { data: profissionalSession } = useSession();
  const [formSent, setFormSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/paciente/anamnese/liberar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          profissionalId: profissionalSession.id,
        }),
      });

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
    <div className="flex flex-col items-center pt-10 gap-5">
      <Image
        alt="ficha"
        height={80}
        radius="sm"
        src="/icons/CheckedIcon.svg"
        width={80}
        className="text-primary"
        style={{
          filter:
            "invert(34%) sepia(91%) saturate(747%) hue-rotate(201deg) brightness(95%) contrast(92%)",
        }}
      />
      <p className="my-4 text-2xl text-primary text-center w-80">
        Formulário de anamnese liberado para o paciente!
      </p>
      <Button
        className="text-primary border-primary w-80"
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
    <div className="flex h-screen max-h-screen">
      <img
        src={"/static/img/liberar.png"}
        alt="Login Image"
        width={"1000"}
        height={"1000"}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container">
        <div className="flex sub-container max-w-[540px] justify-center">
          <h1 className="flex text-4xl w-full text-primary justify-center text-center">
            Liberar Ficha Anamnese
          </h1>

          {!formSent ? (
            <FormProvider {...methods}>
              <div className="flex mt-12 justify-center">
                <div className="flex flex-col items-center w-80">
                  <h1 className="flex text-left text-2xl pb-2 text-primary w-full">
                    Dados do Paciente
                  </h1>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col w-80 gap-4 justify-center items-center"
                  >
                    <DadosIniciais />
                    <div className="flex justify-center w-full">
                      <FormButton
                        label="Liberar Acesso"
                        icon={isLoading ? <Spinner /> : <FileIcon />}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </FormProvider>
          ) : (
            formSuccess
          )}
        </div>
      </section>
    </div>
  );
};

export default CadastroPaciente;
