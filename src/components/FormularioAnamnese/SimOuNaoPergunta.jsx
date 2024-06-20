import { RadioGroup, Radio } from "@nextui-org/radio";

const SimOuNaoPergunta = ({ pergunta, register, errors }) => {
  return (
    <div className="flex justify-between items-stretch">
      <div className="bg-slate-600 p-4 text-terciary flex-grow w-[42%]">
        {pergunta.texto}
      </div>
      <div className="bg-slate-400 p-4 flex-grow flex items-center w-[57%]">
        <RadioGroup
          {...register(`simOuNao.${pergunta.id}`, { required: true })}
          orientation="horizontal"
          className="radio-group-responsive"
        >
          <Radio value="true" className="flex text-secondary">
            Sim
          </Radio>
          <Radio value="false" className="flex text-secondary">
            Não
          </Radio>
        </RadioGroup>
        {errors.simOuNao && errors.simOuNao[pergunta.id] && (
          <span className="text-red-600">
            {errors.simOuNao[pergunta.id].message}
          </span>
        )}
      </div>
    </div>
  );
};

export { SimOuNaoPergunta };
