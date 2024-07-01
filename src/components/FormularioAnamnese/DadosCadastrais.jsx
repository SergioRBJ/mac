import { Input } from "@nextui-org/react";
import { DateInput } from "@/components/shared/DateInput";
import { useFormContext } from "react-hook-form";
import { usePacienteContext } from "@/contexts/pacienteContext";
import { format } from "date-fns";
import Select from "react-select";

const estadosCivis = [
  { value: "Solteiro(a)", label: "Solteiro(a)" },
  { value: "Casado(a)", label: "Casado(a)" },
  { value: "Divorciado(a)", label: "Divorciado(a)" },
  { value: "Viúvo(a)", label: "Viúvo(a)" },
];

const tiposSanguineos = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const DadosCadastrais = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { paciente } = usePacienteContext();

  const defaultTipoSanguineo = tiposSanguineos.find(
    (tipo) => tipo.value === paciente.tipoSanguineo
  );

  const defaultEstadoCivil = estadosCivis.find(
    (estado) => estado.value === paciente.estadoCivil
  );

  return (
    <>
      <p className="text-2xl w-[64%] p-2 mt-8 text-primary">Dados Cadastrais</p>

      <div className="mb-4">
        <Input
          defaultValue={paciente.nomeCompleto}
          fullWidth
          placeholder="Nome Completo"
          {...register("nomeCompleto")}
        />
        {errors.nomeCompleto && (
          <span className="text-red-500">{errors.nomeCompleto.message}</span>
        )}
      </div>
      <div className="mb-4">
        <Select
          defaultValue={defaultTipoSanguineo}
          options={tiposSanguineos}
          onChange={(option) => setValue("tipoSanguineo", option.value)}
          placeholder="Tipo Sanguíneo"
          instanceId={"tipoSanguineo"}
        />
        {errors.tipoSanguineo && (
          <span className="text-red-500">{errors.tipoSanguineo.message}</span>
        )}
      </div>
      <div className="mb-4">
        <DateInput
          defaultValue={
            paciente.dataNascimento
              ? format(new Date(paciente.dataNascimento), "dd/MM/yyyy")
              : ""
          }
          placeholder="Data de Nascimento DD/MM/AAAA"
          onChange={(value) => setValue("dataNascimento", value)}
        />
        {errors.dataNascimento && (
          <span className="text-red-500">{errors.dataNascimento.message}</span>
        )}
      </div>
      <div className="mb-4">
        <Select
          defaultValue={defaultEstadoCivil}
          options={estadosCivis}
          onChange={(option) => setValue("estadoCivil", option.value)}
          placeholder="Estado Civil"
          instanceId={"estadoCivil"}
        />
        {errors.estadoCivil && (
          <span className="text-red-500">{errors.estadoCivil.message}</span>
        )}
      </div>
      <div className="mb-4">
        <Input
          defaultValue={paciente.profissao}
          fullWidth
          placeholder="Profissão"
          {...register("profissao")}
        />
        {errors.profissao && (
          <span className="text-red-500">{errors.profissao.message}</span>
        )}
      </div>
      <div className="mb-4">
        <Input
          defaultValue={paciente.peso}
          fullWidth
          placeholder="Peso 00.000"
          type="number"
          {...register("peso", { valueAsNumber: true })}
        />
        {errors.peso && (
          <span className="text-red-500">{errors.peso.message}</span>
        )}
      </div>
      <div className="mb-4">
        <Input
          defaultValue={paciente.altura}
          fullWidth
          placeholder="Altura 0.00"
          type="number"
          {...register("altura", { valueAsNumber: true })}
        />
        {errors.altura && (
          <span className="text-red-500">{errors.altura.message}</span>
        )}
      </div>
    </>
  );
};

export { DadosCadastrais };
