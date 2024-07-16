import { Resultado } from "@/components/anamnese/resultado/Resultado";

const ResultadoPage = (props) => {
  return (
    <div className="p-5">
      <Resultado idFicha={props.params.idFicha} />
    </div>
  );
};

export default ResultadoPage;
