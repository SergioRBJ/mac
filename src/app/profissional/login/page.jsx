"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LoginIcon from "@/icons/LoginIcon.svg";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import LoginImage from "../../public/static/img/login.png";

const loginSchema = z.object({
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
    resolver: zodResolver(loginSchema),
  });
  const [errorLogin, setErrorLogin] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setErrorLogin(null);
    setIsLoading(true);

    // NEXTAUTH AUTHENTICATION
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response.ok) {
      try {
        setTimeout(() => {
          setIsLoading(false);
          router.push("/paciente/anamnese/liberar");
        }, 2000);
      } catch (error) {
        console.error("Erro ao tentar realizar o login:", error);
      }
    } else {
      const errorMessage =
        response.error === "CredentialsSignin"
          ? "Email ou senha incorretos."
          : "Erro ao tentar realizar o login.";
      setTimeout(() => {
        setErrorLogin(errorMessage);
        setIsLoading(false);
      }, 2000);

      return;
    }
  };

  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src={LoginImage}
        alt="Login Image"
        width={"1000"}
        height={"1000"}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container">
        <div className="flex sub-container max-w-[540px] justify-center">
          <h1 className="flex text-4xl w-full text-primary justify-center text-center">
            Portal Microscopia À Chinesa
          </h1>
          <div className="flex mt-12 justify-center">
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
        </div>
      </section>
    </div>
  );
};

export default ProfissionalLogin;
