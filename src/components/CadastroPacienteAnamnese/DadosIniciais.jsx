import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const DadosIniciais = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-12">
      <div className="mb-4">
        <Input
          fullWidth
          placeholder="Nome Completo"
          {...register("nomeCompleto")}
        />
        {errors.nomeCompleto && (
          <span className="text-red-500">{errors.nomeCompleto.message}</span>
        )}
      </div>

      <div className="mb-4">
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
    </div>
  );
};

export { DadosIniciais };
