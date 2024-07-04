"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LoginIcon from "@/icons/LoginIcon.svg";
import { Button } from "@nextui-org/react";
import * as z from "zod";
import { useNavegacaoContext } from "@/contexts/navegacaoContext";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

const formularioSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." })
    .refine((value) => value.trim() !== "", {
      message: "Email é obrigatório.",
      path: ["email"],
    }),
  password: z.string().min(1, { message: "Por favor, insira a senha." }),
});

const ProfissionalLogin = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formularioSchema),
  });
  const { setNavegacaoValida } = useNavegacaoContext();
  const [errorLogin, setErrorLogin] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setErrorLogin(null);
    setIsLoading(true);

    //DUMMY VALIDATION
    if (
      data.email === "sergiobernardi.dev@gmail.com" &&
      data.password === "123"
    ) {
      try {
        setNavegacaoValida("/paciente/anamnese/liberar");

        setTimeout(() => {
          setIsLoading(false);
          router.push(`/paciente/anamnese/liberar`);
        }, 2000);
      } catch (error) {
        console.error("Erro ao tentar realizar o login:", error);
      }
    } else {
      setTimeout(() => {
        setErrorLogin("Email ou senha incorretos.");
        setIsLoading(false);
      }, 2000);

      return;
    }
  };

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        PORTAL MICROSCOPIA À CHINESA
      </h1>
      <div className="mt-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 w-80"
        >
          <Input
            fullWidth
            placeholder="Email"
            type="email"
            {...register("email")}
            className="w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-left w-full">
              {errors.email.message}
            </span>
          )}

          <Input
            fullWidth
            placeholder="Senha"
            type="password"
            {...register("password")}
            className="w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-left w-full">
              {errors.password.message}
            </span>
          )}

          {errorLogin && <span className="text-red-500">{errorLogin}</span>}
          <Button
            className="text-primary border-primary w-full"
            size="lg"
            variant="bordered"
            startContent={isLoading ? <Spinner /> : <LoginIcon />}
            type="submit"
          >
            Acessar
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ProfissionalLogin;
