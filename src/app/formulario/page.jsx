import { Pergunta } from "@/components/pergunta/pergunta";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-10">
      <h1 className="text-5xl text-center w-full">FORMULÁRIO DE ANAMNESE</h1>
      <Pergunta />
    </main>
  );
};

export default Home;
