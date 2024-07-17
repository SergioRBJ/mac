import { Pergunta } from "./Pergunta";
import { Divider } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { tipoPerguntaAnamnese } from "@/utils/constants";

const PerguntasSessao = ({ perguntas, hasMultiplaEscolhaErrors }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const tipos = tipoPerguntaAnamnese.map((obj) => {
    const key = Object.keys(obj)[0];
    return { tipo: key, label: obj[key] };
  });

  return (
    <div className="w-full box-pergunta">
      {tipos.map(({ tipo, label }) => {
        const perguntasFiltradas = perguntas.filter(
          (pergunta) => pergunta.tipo === tipo
        );
        return (
          <div key={tipo}>
            <p key={tipo} className="text-2xl w-[64%] p-2 mt-8 text-primary">
              {label}
            </p>
            {hasMultiplaEscolhaErrors && (
              <p className="text-red-600">
                Por favor, responda todas as perguntas.
              </p>
            )}
            <div className="shadow-xl rounded-lg overflow-hidden">
              {perguntasFiltradas.map((pergunta, index) => (
                <div key={pergunta._id}>
                  <Pergunta
                    pergunta={pergunta}
                    register={register}
                    errors={errors}
                  />
                  {perguntasFiltradas.length !== index + 1 ? <Divider /> : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { PerguntasSessao };
