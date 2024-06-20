import { RadioGroup, Radio } from "@nextui-org/radio";

const values = ["Frequentemente", "Às vezes", "Raro/Nunca"];

const Periodicidade = ({ perguntaId, register }) => {
  return (
    <RadioGroup
      {...register(`perguntas.${perguntaId}`)}
      orientation="horizontal"
      className="radio-group-responsive"
    >
      {values.map((value, index) => (
        <Radio value={value} className="flex text-secondary" key={index}>
          {value}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export { Periodicidade };
