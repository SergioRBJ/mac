import { Periodicidade } from "@/components/Periodicidade";

const Pergunta = ({ pergunta, register }) => {
  return (
    <div className="flex justify-between items-stretch">
      <div className="bg-slate-600 p-4 text-terciary flex-grow w-[42%]">
        {pergunta.pergunta}
      </div>
      <div className="bg-slate-400 p-4 flex-grow flex items-center w-[57%]">
        <Periodicidade perguntaId={pergunta._id} register={register} />
      </div>
    </div>
  );
};

export { Pergunta };
