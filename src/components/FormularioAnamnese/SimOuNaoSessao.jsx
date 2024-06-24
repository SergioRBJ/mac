import { SimOuNaoPergunta } from "./SimOuNaoPergunta";
import { Divider } from "@nextui-org/react";

const SimOuNaoSessao = ({ hasSimOuNaoErrors, perguntas }) => {
  const sessao = perguntas[0];

  return (
    <div className="w-full box-pergunta">
      {sessao && (
        <p className="text-2xl w-[64%] p-2 mt-8 text-primary">{sessao.texto}</p>
      )}
      {hasSimOuNaoErrors && (
        <p className="text-red-600">Por favor, responda todas as perguntas.</p>
      )}
      <div className="shadow-xl rounded-lg overflow-hidden">
        {sessao &&
          sessao.perguntas.map((pergunta, index) => (
            <div key={pergunta._id}>
              <SimOuNaoPergunta pergunta={pergunta} />
              {sessao.perguntas.length !== index + 1 ? <Divider /> : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export { SimOuNaoSessao };
