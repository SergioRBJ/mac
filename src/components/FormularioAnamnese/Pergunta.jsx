import { Periodicidade } from "@/components/Periodicidade";

const Pergunta = ({ pergunta }) => {
  return (
    <div className="flex justify-between items-stretch">
      <div className="bg-slate-600 p-4 text-terciary flex-grow w-[35%]">
        {pergunta.pergunta}
      </div>
      <div className="bg-slate-400 p-4 flex-grow flex items-center">
        <Periodicidade />
      </div>
    </div>
  );
};

export { Pergunta };
