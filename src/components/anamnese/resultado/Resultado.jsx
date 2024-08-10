import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { BackButton } from "@/components/BackButton";
import { CardDadosPaciente } from "@/components/anamnese/resultado/CardDadosPaciente";
import { Relatorio } from "./Relatorio";

const getRespostaFicha = async ({ idFicha }) => {
  const response = await fetch(
    `${process.env.BASE_URL_PATH}/api/paciente/anamnese/resposta-ficha/${idFicha}`
  );
  const data = await response.json();
  return data.data;
};

const Resultado = async ({ idFicha }) => {
  const ficha = await getRespostaFicha({ idFicha });
  const {
    nomeCompleto,
    email,
    idade,
    altura,
    peso,
    estadoCivil,
    tipoSanguineo,
    profissao,
    remedios,
    doencaCronica,
    resultado,
  } = ficha;

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 px-6">
        <Image
          alt="Paciente"
          height={40}
          radius="sm"
          src="/icons/user.svg"
          width={40}
          className="text-primary"
        />
        <div className="flex flex-col">
          <p className="text-md">{nomeCompleto}</p>
          <p className="text-small text-default-500">{email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-6">
        <p className="text-primary text-lg pb-4">Dados Cadastrais</p>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 justify-between items-start">
            <CardDadosPaciente label="Idade" value={idade} variant={"idade"} />
            <CardDadosPaciente
              label="Altura"
              value={altura}
              variant={"altura"}
            />
            <CardDadosPaciente label="Peso" value={peso} variant={"peso"} />
            <CardDadosPaciente label="Tipo Sanguíneo" value={tipoSanguineo} />
          </div>
          <div className="flex gap-5 justify-between items-start">
            <CardDadosPaciente label="Estado Civil" value={estadoCivil} />
            <CardDadosPaciente label="Profissão" value={profissao} />
          </div>
          <div className="gap-5">
            {remedios && (
              <CardDadosPaciente label="Remédios" value={remedios} />
            )}
            <div className="pt-5">
              {doencaCronica && (
                <CardDadosPaciente
                  label="Doenças Crônicas"
                  value={doencaCronica}
                />
              )}
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />

      <Divider />
      <p className="text-primary text-lg py-4 pl-6">Relatório</p>
      {resultado &&
        resultado.map((relatorio, index) => (
          <Relatorio key={index} anamnese={relatorio} />
        ))}

      <CardFooter className="gap-5 p-6">
        <BackButton>Voltar</BackButton>
        {/* <Button className="bg-slate-700" color="primary">
          <p className="text-white">Salvar PDF</p>
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export { Resultado };
