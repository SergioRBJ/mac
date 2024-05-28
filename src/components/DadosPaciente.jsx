import {
  Card,
  CardHeader,
  Image,
  Divider,
  CardBody,
  CardFooter,
  Button,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
  table,
} from "@nextui-org/react";
import { PieChart } from "@/components/PieChart";

const rows = [
  {
    key: "2",
    name: "Nunca",
    peso: 0,
  },
  {
    key: "3",
    name: "Raro",
    peso: 6,
  },
  {
    key: "1",
    name: "Às vezes",
    peso: 2,
  },
  {
    key: "4",
    name: "Frequentemente",
    peso: 2,
  },
];

const columns = [
  {
    key: "name",
    label: "Secura do Pulmão",
  },
  {
    key: "peso",
    label: "Respostas",
  },
];

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

        <p className="text-primary text-lg py-4">Relatório</p>

        <div className="flex items-start flex-col sm:flex-row">
          <div className="w-full sm:max-w-[50%]">
            <Table
              aria-label="Rows actions table example with dynamic content"
              selectionMode="none"
              removeWrapper
              className="bg-slate-700 rounded-lg border-collapse"
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    className="bg-slate-700 text-md text-question text-center font-normal"
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow
                    key={item.key}
                    className="text-center bg-slate-300 rounded-full border-collapse"
                  >
                    {(columnKey) => (
                      <TableCell className="text-center text-slate-800">
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="h-52 w-full">
            <PieChart data={rows} />
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="gap-5 p-6">
        <Link href="/lista-pacientes">
          <Button className="bg-slate-700" color="primary">
            <p className="text-white">Voltar</p>
          </Button>
        </Link>
        <Button className="bg-slate-700" color="primary">
          <p className="text-white">Salvar PDF</p>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { DadosPaciente };
