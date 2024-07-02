import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const DadosIniciais = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <Input
        fullWidth
        placeholder="Nome Completo"
        {...register("nomeCompleto")}
      />
      {errors.nomeCompleto && (
        <span className="text-red-500">{errors.nomeCompleto.message}</span>
      )}

      <Input
        fullWidth
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </div>
  );
};

export { DadosIniciais };
