import { useFormContext } from "react-hook-form";

const PerguntasAdicionais = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="mb-2">
        <p className="ml-2 text-lg">
          Liste os medicamentos que você está atualmente tomando, incluindo o
          nome, dosagem e frequência de uso.
        </p>
        <textarea
          {...register("remedios")}
          rows={4}
          className={`w-full rounded-lg p-3 form-control ${
            errors.pergunta1 ? "is-invalid" : ""
          }`}
        />
        {errors.pergunta1 && (
          <div className="invalid-feedback">{errors.pergunta1.message}</div>
        )}
      </div>

      <div className="">
        <p className="ml-2 text-lg">
          Você tem alguma doença crônica? Se sim, liste-as.
        </p>
        <textarea
          {...register("doencaCronica")}
          rows={4}
          className={`w-full rounded-lg p-3 form-control ${
            errors.pergunta2 ? "is-invalid" : ""
          }`}
        />
        {errors.pergunta2 && (
          <div className="invalid-feedback">{errors.pergunta2.message}</div>
        )}
      </div>
    </>
  );
};

export { PerguntasAdicionais };
