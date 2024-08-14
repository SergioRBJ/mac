import { Resultado } from "@/components/anamnese/resultado/Resultado";
import { Header } from "@/components/Header";

const ResultadoPage = (props) => {
  return (
    <div className="p-5">
      <Header />
      <Resultado idFicha={props.params.idFicha} />
    </div>
  );
};

export default ResultadoPage;
