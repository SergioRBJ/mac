"use client";

import { PerguntasSessao } from "@/components/FormularioAnamnese/PerguntasSessao";
import { DadosCadastrais } from "@/components/FormularioAnamnese/DadosCadastrais";
import { SimOuNaoSessao } from "@/components/FormularioAnamnese/SimOuNaoSessao";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import * as z from "zod";

const formularioSchema = z.object({
  nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório." }),
  idade: z.coerce
    .number({ message: "Idade é obrigatória." })
    .min(1, { message: "Idade é obrigatória." }),
  dataNascimento: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date"
          ? "Data de Nascimento é obrigatória."
          : defaultError,
    }),
  }),
  estadoCivil: z.string({ required_error: "Estado Civil é obrigatório." }),
  profissao: z.string().min(1, { message: "Profissão é obrigatória." }),
  peso: z.coerce
    .number({ message: "Peso é obrigatório." })
    .positive("Peso deve ser um número positivo."),
  altura: z.coerce
    .number({ message: "Altura é obrigatória." })
    .positive("Altura deve ser um número positivo."),
  tipoSanguineo: z.string({ required_error: "Tipo Sanguíneo é obrigatório." }),
  simOuNao: z.any(),
});

const Formulario = () => {
  const methods = useForm({
    resolver: zodResolver(formularioSchema),
    defaultValues: {
      simOuNao: {},
    },
  });

  const [perguntasPolar, setPerguntasPolar] = useState([]);
  const [perguntasMultiplaEscolha, setPerguntasMultiplaEscolha] = useState([]);
  const [hasSimOuNaoErrors, setHasSimOuNaoErrors] = useState("");

  const fetchPerguntas = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setPerguntasPolar(data.perguntasPolar);
      setPerguntasMultiplaEscolha(data.perguntasMultiplaEscolha);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  };

  useEffect(() => {
    fetchPerguntas();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(methods.errors);
    const simOuNaoValues = data.simOuNao || {};

    const unansweredQuestions = Object.values(simOuNaoValues).some(
      (value) => value === "null"
    );

    if (unansweredQuestions) {
      setHasSimOuNaoErrors("Por favor, responda todas as perguntas.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      setHasSimOuNaoErrors("");
      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO DE ANAMNESE
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DadosCadastrais />
          <SimOuNaoSessao
            hasSimOuNaoErrors={hasSimOuNaoErrors}
            perguntas={perguntasPolar}
          />
          <PerguntasSessao perguntas={perguntasMultiplaEscolha} />
          <div className="my-8 flex justify-center">
            <FormButton />
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default Formulario;
