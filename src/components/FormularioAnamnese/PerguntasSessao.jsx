import { Pergunta } from "./Pergunta";
import { perguntasFormulario } from "@/mock/perguntas";
import { Divider } from "@nextui-org/react";

const PerguntasSessao = () => {
  return (
    <>
      {perguntasFormulario.map((perguntas) => (
        <>
          <p
            key={perguntas.id}
            className="text-2xl w-[64%] p-2 mt-8 text-primary"
          >
            {perguntas.texto}
          </p>
          <div className="shadow-xl w-[65%] rounded-lg overflow-hidden">
            {perguntas.perguntas.map((pergunta, index) => (
              <div key={pergunta.id}>
                <Pergunta pergunta={pergunta} />
                {perguntas.perguntas.length !== index + 1 ? <Divider /> : null}
              </div>
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export { PerguntasSessao };
