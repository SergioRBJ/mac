import { SimOuNaoPergunta } from "./SimOuNaoPergunta";
import { Divider } from "@nextui-org/react";

const SimOuNaoSessao = ({ hasSimOuNaoErrors, perguntas }) => {
  return (
    <div className="w-full box-pergunta">
      <p className="text-2xl w-[64%] p-2 mt-8 text-primary">Perguntas Gerais</p>
      {hasSimOuNaoErrors && (
        <p className="text-red-600">Por favor, responda todas as perguntas.</p>
      )}
      <div className="shadow-xl rounded-lg overflow-hidden">
        {perguntas.map((pergunta, index) => (
          <div key={pergunta.id}>
            <SimOuNaoPergunta pergunta={pergunta} />
            {perguntas.length !== index + 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SimOuNaoSessao };
