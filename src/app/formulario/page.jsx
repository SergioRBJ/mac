"use client";

import { PerguntasSessao } from "@/components/FormularioAnamnese/PerguntasSessao";
import { DadosCadastrais } from "@/components/FormularioAnamnese/DadosCadastrais";
import { SimOuNaoSessao } from "@/components/FormularioAnamnese/SimOuNaoSessao";
import { FormButton } from "@/components/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";

const onSubmit = (data) => {
  console.log(data);
  // Adicione aqui a lógica para enviar os dados para o servidor ou processar o formulário
};

// Definindo o esquema de validação com zod
const formularioSchema = z.object({
  nomeCompleto: z.string().min(1, { message: "Nome Completo é obrigatório" }),
  idade: z.number().int().positive("Idade deve ser um número positivo"),
  dataNascimento: z.date().refine(
    (date) => {
      return date instanceof Date && !isNaN(date.getTime());
    },
    { message: "Data de Nascimento é obrigatória" }
  ),
  estadoCivil: z.string().min(1, { message: "Estado Civil é obrigatório" }),
  profissao: z.string().min(1, { message: "Profissão é obrigatória" }),
  peso: z.number().positive("Peso deve ser um número positivo"),
  altura: z.number().positive("Altura deve ser um número positivo"),
  tipoSanguineo: z.string().min(1, { message: "Tipo Sanguíneo é obrigatório" }),
});

const Formulario = () => {
  const methods = useForm({
    resolver: zodResolver(formularioSchema),
  });

  const onSubmit = async (data) => {
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

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
      // Adicione aqui a lógica para tratar a resposta do servidor, como redirecionamento ou exibição de mensagem de sucesso
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      // Adicione aqui a lógica para tratar erros, como exibição de mensagem de erro
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
          {/* <SimOuNaoSessao />
          <PerguntasSessao /> */}
          <div className="my-8 flex justify-center">
            <FormButton />
          </div>
        </form>
      </FormProvider>
    </main>
  );
};

export default Formulario;
