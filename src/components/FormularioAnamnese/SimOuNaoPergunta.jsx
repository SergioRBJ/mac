import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, Radio } from "@nextui-org/radio";

const SimOuNaoPergunta = ({ pergunta }) => {
  const { control } = useFormContext();

  return (
    <div className="flex justify-between items-stretch">
      <div className="bg-slate-600 p-4 text-terciary flex-grow w-[42%]">
        {pergunta.texto}
      </div>
      <div className="bg-slate-400 p-4 flex-grow flex items-center w-[57%]">
        <Controller
          name={`simOuNao.${pergunta.id}`}
          control={control}
          defaultValue={"null"}
          render={({ field }) => (
            <RadioGroup
              {...field}
              orientation="horizontal"
              className="radio-group-responsive"
              value={field.value || null}
              onChange={(value) => field.onChange(value)}
            >
              <Radio value="true" className="flex text-secondary">
                Sim
              </Radio>
              <Radio value="false" className="flex text-secondary">
                Não
              </Radio>
            </RadioGroup>
          )}
        />
      </div>
    </div>
  );
};

export { SimOuNaoPergunta };
