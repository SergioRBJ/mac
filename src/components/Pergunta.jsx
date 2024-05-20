import { Periodicidade } from "@/components/Periodicidade";

const Pergunta = () => {
  return (
    <div className="card shadow-xl rounded-lg w-[55%] w-max-[55%] mx-auto">
      <div className="card-body mb-4 bg-slate-600 px-4 py-2">
        <p className="font-bold text-xl mb-2 text-question">Calor</p>
        <p className="text-terciary">
          Resíduos de energia quente no organismo.
        </p>
      </div>

      <div className="flex justify-center m-4">
        <Periodicidade />
      </div>
    </div>
  );
};

export { Pergunta };
