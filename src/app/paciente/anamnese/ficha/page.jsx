"use client";

import { PerguntasSessao } from "@/components/FormularioAnamnese/PerguntasSessao";
import { DadosCadastrais } from "@/components/FormularioAnamnese/DadosCadastrais";
import { SimOuNaoSessao } from "@/components/FormularioAnamnese/SimOuNaoSessao";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import PlaneIcon from "@/icons/PlaneIcon.svg";
import { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { usePacienteContext } from "@/contexts/pacienteContext";
import { useRouter } from "next/navigation";
import { useNavegacaoContext } from "@/contexts/navegacaoContext";
import * as z from "zod";

const formularioSchema = z.object({
  nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório." }),
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
  multiplaEscolha: z.any(),
});

const Formulario = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(formularioSchema),
    defaultValues: {
      simOuNao: {},
      multiplaEscolha: {},
    },
  });
  const { paciente: pacienteData } = usePacienteContext();
  const { navegacaoValida, setNavegacaoValida } = useNavegacaoContext();

  const [perguntasPolar, setPerguntasPolar] = useState([]);
  const [perguntasMultiplaEscolha, setPerguntasMultiplaEscolha] = useState([]);
  const [hasSimOuNaoErrors, setHasSimOuNaoErrors] = useState("");
  const [hasMultiplaEscolhaErrors, setHasMultiplaEscolhaErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formSent, setFormSent] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();

      const perguntasPolarResultado = data.perguntas.filter(
        (pergunta) => pergunta.tipo === "POLAR"
      );

      const perguntasMultiplaEscolhaResultado = data.perguntas.filter(
        (pergunta) => pergunta.tipo !== "POLAR"
      );

      setPerguntasPolar(perguntasPolarResultado);
      setPerguntasMultiplaEscolha(perguntasMultiplaEscolhaResultado);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const rotaValida = "/paciente/anamnese/preencher";
    if (navegacaoValida !== rotaValida) {
      router.push(rotaValida);
    } else {
      fetchData();
      setNavegacaoValida("");
    }
  }, []);

  const onSubmit = async (data) => {
    const simOuNaoValues = data.simOuNao || {};
    const multiplaEscolhaValues = data.multiplaEscolha || {};

    // VALIDAR QUE TODAS AS PERGUNTAS POLARES SEJAM RESPONDIDAS
    const perguntasPolaresVazias = Object.values(simOuNaoValues).some(
      (value) => value === "null"
    );

    if (perguntasPolaresVazias) {
      setHasSimOuNaoErrors("Por favor, responda todas as perguntas.");
    }

    // // VALIDAR DE TODAS AS PERGUNTAS DE MULTIPLA ESCOLHE SEJAM RESPONDIDAS
    // const perguntasMultiplaEscolhaRespondidas = Object.values(
    //   multiplaEscolhaValues
    // ).some((value) => value === "null");

    // if (perguntasMultiplaEscolhaRespondidas) {
    //   setHasMultiplaEscolhaErrors("Por favor, responda todas as perguntas.");
    // } else {
    //   setHasMultiplaEscolhaErrors("");
    // }

    try {
      const response = await fetch("/api/paciente/anamnese/preencher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, email: pacienteData.email }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      setHasSimOuNaoErrors("");
      const result = await response.json();
      setFormSent(true);
      console.log("Dados enviados com sucesso:", result);
    } catch (error) {
      setFormSent(false);
      console.error("Erro ao enviar formulário:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <Spinner type="points" size="lg" />
        <p className="mt-4 text-2xl p-2 text-primary">
          Carregando formulário...
        </p>
      </div>
    );
  }

  const formSuccess = (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
      <p className="mt-4 text-2xl p-2 text-primary">
        Formulário enviado com sucesso!
      </p>
    </div>
  );

  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO DE ANAMNESE
      </h1>

      {!formSent ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DadosCadastrais />
            <SimOuNaoSessao
              hasSimOuNaoErrors={hasSimOuNaoErrors}
              perguntas={perguntasPolar}
            />
            <PerguntasSessao
              perguntas={perguntasMultiplaEscolha}
              hasMultiplaEscolhaErrors={hasMultiplaEscolhaErrors}
            />
            <div className="my-8 flex justify-center">
              <FormButton label="Enviar Formulário" icon={<PlaneIcon />} />
            </div>
          </form>
        </FormProvider>
      ) : (
        formSuccess
      )}
    </main>
  );
};

export default Formulario;
