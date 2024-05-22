import { Pergunta } from "@/components/Pergunta";
import { FormButton } from "@/components/FormButton";

const Home = () => {
  return (
    <main className="flex flex-col items-center pt-10 gap-10">
      <h1 className="text-5xl text-center w-full text-primary">
        FORMULÁRIO DE ANAMNESE
      </h1>
      <Pergunta />
      <FormButton />
    </main>
  );
};

export default Home;
