import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  CardFooter,
  Button,
  Link,
} from "@nextui-org/react";

const DadosPaciente = ({ nome, email }) => {
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
          <p className="text-md">{nome}</p>
          <p className="text-small text-default-500">{email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="p-6">
        <p className="text-primary text-lg pb-4">Dados Cadastrais</p>
        <div className="flex gap-5 justify-between items-start">
          <Card className="flex items-center w-full">
            <CardHeader className="flex items-center justify-center bg-slate-700">
              <p className="text-question">Idade</p>
            </CardHeader>
            <CardBody className="flex items-center justify-center bg-slate-300">
              <p className="text-small text-slate-800">40 Anos</p>
            </CardBody>
          </Card>

          <Card className="flex items-center w-full">
            <CardHeader className="flex items-center justify-center bg-slate-700">
              <p className="text-question">Altura</p>
            </CardHeader>
            <CardBody className="flex items-center justify-center bg-slate-300">
              <p className="text-small text-slate-800">1.52</p>
            </CardBody>
          </Card>

          <Card className="flex items-center w-full">
            <CardHeader className="flex items-center justify-center bg-slate-700">
              <p className="text-question">Peso</p>
            </CardHeader>
            <CardBody className="flex items-center justify-center bg-slate-300">
              <p className="text-small text-slate-800">58</p>
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  );
};

export { DadosPaciente };
