"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";
import * as z from "zod";
import { useState } from "react";
import { Header } from "@/components/Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import KeyIcon from "@/icons/KeyIcon.svg";

const senhaSchema = z
  .string()
  .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
  .regex(/[a-zA-Z]/, { message: "A senha deve conter letras." })
  .regex(/[0-9]/, { message: "A senha deve conter números." });

const formularioSchema = z
  .object({
    senhaAntiga: z.string().min(1, "Senha antiga é obrigatória."),
    novaSenha: senhaSchema,
    repitaNovaSenha: z.string(),
  })
  .superRefine(({ novaSenha, repitaNovaSenha }, ctx) => {
    if (novaSenha !== repitaNovaSenha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "As senhas não coincidem.",
        path: ["repitaNovaSenha"],
      });
    }
  });

const TrocaSenha = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formularioSchema),
  });
  const [errorAPI, setErrorAPI] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorAPI(null);
    try {
      const response = await fetch(`/api/profissional/trocar-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senhaAntiga: data.senhaAntiga,
          novaSenha: data.novaSenha,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setErrorAPI(result.message || "Erro ao trocar a senha.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push(`/profissional/login`);
    } catch (error) {
      console.error("Erro ao trocar a senha:", error);
      setErrorAPI("Erro ao trocar a senha.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Header />
      <div className="flex w-full">
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/static/img/liberar.png')" }}
        ></div>
        <main className="flex flex-col items-center justify-center w-1/2 p-10">
          <h1 className="text-5xl text-center w-full text-primary mb-4">
            Alterar Senha
          </h1>
          <p className="text-center w-full text-primary mb-12">
            Após a mudança de senha, você será redirecionado para a página de
            login.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md"
          >
            <div className="mb-6 w-full relative">
              <Input
                className="border-primary border-2 rounded-xl w-full"
                fullWidth
                placeholder="Senha Antiga"
                type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
                {...register("senhaAntiga")}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.senhaAntiga && (
                <span className="text-red-500">
                  {errors.senhaAntiga.message}
                </span>
              )}
            </div>
            <div className="mb-6 w-full relative">
              <Input
                className="border-primary border-2 rounded-xl w-full"
                fullWidth
                placeholder="Nova Senha"
                type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
                {...register("novaSenha")}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.novaSenha && (
                <span className="text-red-500">{errors.novaSenha.message}</span>
              )}
            </div>
            <div className="mb-6 w-full relative">
              <Input
                className="border-primary border-2 rounded-xl w-full"
                fullWidth
                placeholder="Repita a Nova Senha"
                type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
                {...register("repitaNovaSenha")}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
              {errors.repitaNovaSenha && (
                <span className="text-red-500">
                  {errors.repitaNovaSenha.message}
                </span>
              )}
            </div>
            {errorAPI && <span className="text-red-500 mb-2">{errorAPI}</span>}
            <Button
              className="text-primary border-primary w-full"
              size="lg"
              variant="bordered"
              startContent={isLoading ? <Spinner /> : <KeyIcon />}
              type="submit"
            >
              Alterar Senha
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default TrocaSenha;
