import { RadioGroup, Radio } from "@nextui-org/radio";

const values = ["Sempre", "As vezes", "Raro", "Nunca"];

const Periodicidade = () => {
  return (
    <RadioGroup orientation="horizontal">
      <div className="grid grid-cols-4 gap-x-4 place-items-center">
        {values.map((value, index) => (
          <Radio value={value} className="flex text-secondary" key={index}>
            {value}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};

export { Periodicidade };
