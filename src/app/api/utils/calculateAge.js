import { differenceInYears } from "date-fns";

const calculateAge = (dataNascimento) => {
  const dataNascimentoDate = new Date(dataNascimento);
  const hoje = new Date();
  return differenceInYears(hoje, dataNascimentoDate);
};

export { calculateAge };
