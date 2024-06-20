import { SimOuNaoPergunta } from "./SimOuNaoPergunta";
import { perguntasSimOuNao } from "@/mock/perguntasSimOuNao";
import { Divider } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const SimOuNaoSessao = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-full box-pergunta">
      <p className="text-2xl w-[64%] p-2 mt-8 text-primary">Perguntas Gerais</p>
      <div className="shadow-xl rounded-lg overflow-hidden">
        {perguntasSimOuNao.map((pergunta, index) => (
          <div key={pergunta.id}>
            <SimOuNaoPergunta
              pergunta={pergunta}
              register={register}
              errors={errors}
            />
            {perguntasSimOuNao.length !== index + 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SimOuNaoSessao };
