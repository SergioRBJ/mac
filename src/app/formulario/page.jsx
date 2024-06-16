"use client";

import { PerguntasSessao } from "@/components/FormularioAnamnese/PerguntasSessao";
import { FormButton } from "@/components/FormButton";

const Home = () => {
  return (
    <main className="flex flex-col items-center pt-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO DE ANAMNESE
      </h1>
      <PerguntasSessao />
      <div className="mt-10">
        <FormButton />
      </div>
    </main>
  );
};

export default Home;
