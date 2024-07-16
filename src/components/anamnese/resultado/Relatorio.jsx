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

const rows = [
  {
    key: "3",
    name: "Raro/Nunca",
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

const Relatorio = ({ anamnese }) => {
  return (
    <section className="px-6">
      <p className="text-primary text-lg py-4">Relatório</p>

      <div className="flex items-start flex-col sm:flex-row">
        <div className="w-full sm:max-w-[50%] pb-4">
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
        <div className="h-52 w-full p-0 m-0">
          <PieChart data={rows} />
        </div>
      </div>
    </section>
  );
};

export { Relatorio };
