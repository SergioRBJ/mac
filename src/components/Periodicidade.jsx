import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, Radio } from "@nextui-org/radio";

const values = [
  { label: "Frequentemente", value: "FREQUENTEMENTE" },
  { label: "Às vezes", value: "AS_VEZES" },
  { label: "Raro/Nunca", value: "RARO_NUNCA" },
];

const Periodicidade = ({ perguntaId }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`multiplaEscolha.${perguntaId}`}
      control={control}
      defaultValue={"null"}
      render={({ field }) => (
        <RadioGroup
          {...field}
          orientation="horizontal"
          className="radio-group-responsive"
          value={field.value || ""}
          onChange={(value) => field.onChange(value)}
        >
          {values.map((e, index) => (
            <Radio value={e.value} className="flex text-secondary" key={index}>
              {e.label}
            </Radio>
          ))}
        </RadioGroup>
      )}
    />
  );
};

export { Periodicidade };
