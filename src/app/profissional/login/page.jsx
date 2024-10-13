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
        case "TEST_EXPIRED":
          errorMessage = (
            <>
              Seu período de testes expirou. Adquira agora sua assinatura{" "}
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
          errorMessage = "Erro ao tentar realizar o login.";
          break;
      }

      setErrorLogin(errorMessage);
      setIsLoading(false);

      return;
    }
  };

  return (
    <div className="flex h-screen max-h-screen">
      <img
        src={"/static/img/owner.png"}
        alt="Login Image"
        width={"1000"}
        height={"1000"}
        className="side-img max-w-[50%]"
      />
      <section className="container">
        <div
          className={`flex sub-container max-w-[540px] remove-scrollbar fade-in ${
            isVisible ? "visible" : ""
          }`}
        >
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
                className="w-full border-primary border-2 rounded-xl"
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
                className="w-full border-primary border-2 rounded-xl"
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
