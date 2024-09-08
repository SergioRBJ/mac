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
import { TabelaTipo } from "./TabelaTipo";

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
    nascimento,
    idade,
    altura,
    peso,
    estadoCivil,
    tipoSanguineo,
    profissao,
    sexo,
    remedios,
    doencaCronica,
    resultado,
    emocoesSentimentos,
  } = ficha;

  return (
    <Card className="w-full mt-16">
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
            <CardDadosPaciente label="Nascimento" value={nascimento} />
            <CardDadosPaciente label="Idade" value={idade} variant={"idade"} />
            <CardDadosPaciente
              label="Altura"
              value={altura}
              variant={"altura"}
            />
            <CardDadosPaciente label="Peso" value={peso} variant={"peso"} />
          </div>
          <div className="flex gap-5 justify-between items-start">
            <CardDadosPaciente label="Tipo Sanguíneo" value={tipoSanguineo} />
            {sexo && (
              <CardDadosPaciente
                label="Sexo"
                value={
                  sexo
                    ? sexo.charAt(0).toUpperCase() + sexo.slice(1).toLowerCase()
                    : " - "
                }
              />
            )}
            <CardDadosPaciente label="Estado Civil" value={estadoCivil} />
            <CardDadosPaciente label="Profissão" value={profissao} />
          </div>
        </div>
      </CardBody>
      <Divider />

      {remedios || doencaCronica ? (
        <>
          <div className="flex flex-col pt-4 pb-6">
            <div className="px-6 w-full">
              <p className="text-primary text-lg pb-4">Histórico de Saúde</p>
              <div className="flex justify-between items-start gap-5 h-full">
                {remedios && (
                  <div className="flex-1 ">
                    <CardDadosPaciente label="Remédios" value={remedios} />
                  </div>
                )}

                {doencaCronica && (
                  <div className="flex-1 h-full ">
                    <CardDadosPaciente
                      label="Doenças Crônicas"
                      value={doencaCronica}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}

      <p className="text-primary text-lg py-4 pl-6">Relatório</p>
      {resultado &&
        emocoesSentimentos &&
        [emocoesSentimentos, ...resultado].map((relatorio, index) => (
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
