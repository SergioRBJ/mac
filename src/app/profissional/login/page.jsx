"use client";

import { Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LoginIcon from "@/icons/LoginIcon.svg";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data) => {
    setErrorLogin(null);
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response.ok) {
      try {
        setIsLoading(false);
        router.push("/paciente/anamnese/listar-fichas");
      } catch (error) {
        console.error("Erro ao tentar realizar o login:", error);
      }
    } else {
      let errorMessage;

      switch (response.error) {
        case "CredentialsSignin":
        case "Cannot read properties of null (reading 'password')":
          errorMessage = "Email ou senha incorretos.";
          break;
        case "SUBSCRIPTION_EXPIRED":
          errorMessage = (
            <>
              Seu período de assinatura expirou. Renove agora sua assinatura{" "}
              <a
                className="font-bold underline"
                target="_blank"
                href="https://go.hotmart.com/W93427824V"
              >
                aqui
              </a>
              .
            </>
          );
          break;
        default:
          errorMessage = "Ocorreu um erro ao fazer login. Tente novamente.";
      }

      setErrorLogin(errorMessage);
      setIsLoading(false);

      return;
    }
  };

  return (
    <div className="relative flex h-screen max-h-screen">
      <div className="relative flex w-[45%] hidden md:flex">
        <img
          src={"/static/img/owner.png"}
          alt="Login Image"
          width={"1000"}
          height={"1000"}
          className="side-img"
        />
      </div>
      <div className="relative flex w-full md:w-[55%]">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover video-bg"
          style={{ objectPosition: "right center" }}
        >
          <source src="/videos/bg-login.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-45"></div>
        <section className="relative flex w-full video-container">
          <div
            className={`flex sub-container max-w-[540px] remove-scrollbar fade-in ${
              isVisible ? "visible" : ""
            }`}
          >
            <h1 className="flex text-5xl w-full text-white justify-center text-center font-extrabold">
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
                  className="w-full border-primary border-3 rounded-2xl"
                />
                {errors.email && (
                  <span className="text-terciary text-left w-full text-xl font-bold">
                    {errors.email.message}
                  </span>
                )}

                <Input
                  fullWidth
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                  className="w-full border-primary border-3 rounded-2xl"
                />
                {errors.password && (
                  <span className="text-terciary text-left w-full text-xl font-bold">
                    {errors.password.message}
                  </span>
                )}

                {errorLogin && (
                  <span className="text-xl text-left w-full text-terciary font-bold">
                    {errorLogin}
                  </span>
                )}
                <Button
                  className="bg-terciary border-primary border-3 w-full text-primary"
                  size="lg"
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
    </div>
  );
};

export default ProfissionalLogin;
