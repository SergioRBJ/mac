import { Pergunta } from "./Pergunta";
import { Divider } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const PerguntasSessao = ({ perguntas }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full box-pergunta">
      {perguntas.map((perguntas) => (
        <>
          <p
            key={perguntas.id}
            className="text-2xl w-[64%] p-2 mt-8 text-primary"
          >
            {perguntas.texto}
          </p>
          <div className="shadow-xl rounded-lg overflow-hidden">
            {perguntas.perguntas.map((pergunta, index) => (
              <div key={pergunta.id}>
                <Pergunta
                  pergunta={pergunta}
                  register={register}
                  errors={errors}
                />
                {perguntas.perguntas.length !== index + 1 ? <Divider /> : null}
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export { PerguntasSessao };
