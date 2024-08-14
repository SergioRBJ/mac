"use client";

import { periodicidade } from "@/utils/constants";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue,
  Divider,
} from "@nextui-org/react";

const TabelaTipo = ({ tipo, respostas }) => {
  const columns = [
    {
      key: "pergunta",
      label: "Perguntas",
    },
    {
      key: "resposta",
      label: "Respostas",
    },
  ];

  const rowsForTable =
    respostas.length > 0
      ? respostas.map((item) => {
          const respostaValor = periodicidade.find(
            (obj) => item.resposta in obj
          );
          return {
            pergunta: item.pergunta,
            resposta: respostaValor[item.resposta],
          };
        })
      : [];

  return (
    <section className="px-6 pb-3">
      <div className="flex items-start flex-col sm:flex-row">
        <div className="w-full min-w-[400px]">
          <Table
            aria-label={`Tabela que exibe resultados das perguntas de ${periodicidade[tipo]}`}
            selectionMode="none"
            removeWrapper
            fullWidth
            className="bg-slate-700 rounded-lg border-collapse"
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
            <TableBody items={rowsForTable}>
              {(item) => (
                <TableRow
                  key={item.pergunta}
                  className="text-center bg-slate-300 rounded-full border-collapse"
                >
                  {(columnKey) => (
                    <TableCell className="text-center text-slate-800">
                      {getKeyValue(item, columnKey)}
                      <Divider />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { TabelaTipo };
