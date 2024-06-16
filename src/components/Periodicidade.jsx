import { RadioGroup, Radio } from "@nextui-org/radio";

const values = ["Frequentemente", "Às vezes", "Raro/Nunca"];

const Periodicidade = () => {
  return (
    <RadioGroup orientation="horizontal">
      <div className="radio-group-responsive">
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
