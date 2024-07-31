"use client";

import { PieChart } from "@/components/PieChart";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

const bottomCards = ({ pontuacao, total, porcentagem }) => {
  return (
    <div className="flex gap-5 justify-between px-5 pb-4 w-full">
      <div className="flex flex-col gap-2">
        <p className="text-question text-md">Pontos Totais</p>
        <p className="flex text-lg text-slate-800 bg-slate-300 rounded-lg  justify-center">
          {total}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-question text-md">Pontuação</p>
        <p className="flex text-lg text-slate-800 bg-slate-300 rounded-lg  justify-center">
          {pontuacao}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-question text-md">Porcentagem</p>
        <p className="flex text-lg text-slate-800 bg-slate-300 rounded-lg  justify-center">
          {porcentagem}%
        </p>
      </div>
    </div>
  );
};

const Relatorio = ({ key, anamnese }) => {
  const { label, quantidadeTipoResposta, total, pontuacao, porcentagem } =
    anamnese;

  const columns = [
    {
      key: "label",
      label,
    },
    {
      key: "quantidade",
      label: "Respostas",
    },
  ];

  const rowsForChart = quantidadeTipoResposta.map((item) => ({
    label: item.label,
    quantidade: item.quantidade,
  }));

  return (
    <section className="px-6 pb-6">
      <div className="flex items-start flex-col sm:flex-row">
        <div className="w-full sm:max-w-[50%] min-w-[400px]">
          <Table
            aria-label="Rows actions table with dynamic content"
            selectionMode="none"
            removeWrapper
            fullWidth
            className="bg-slate-700 rounded-lg border-collapse"
            bottomContent={bottomCards({ total, porcentagem, pontuacao })}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className="bg-slate-700 text-md text-question text-center font-normal break-word-column pt-1"
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={quantidadeTipoResposta}>
              {(item) => (
                <TableRow
                  key={item.tipo}
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
        <div className="h-[250px] w-full p-0 m-0">
          <PieChart data={rowsForChart} />
        </div>
      </div>
    </section>
  );
};

export { Relatorio };
