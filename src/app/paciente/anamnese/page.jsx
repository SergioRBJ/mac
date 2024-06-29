"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PatientIcon from "@/icons/PatientIcon.svg";
import { Button } from "@nextui-org/react";
import * as z from "zod";
import { usePacienteContext } from "@/contexts/pacienteContext";

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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/paciente/${data.email}`);

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);

      setPaciente(result.data);

      router.push(`/formulario`);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
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

          <Button
            className="text-primary border-primary"
            size="lg"
            variant="bordered"
            startContent={<PatientIcon />}
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
