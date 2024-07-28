"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { SearchIcon } from "@/icons/SearchIcon";
import { EyeIcon } from "@/icons/EyeIcon";
import { columns } from "./options";
import { useState, useCallback, useMemo, useEffect } from "react";
import { UserDetails } from "@/components/UserDetails/UserDetails";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const INITIAL_VISIBLE_COLUMNS = [
  "nomeCompleto",
  "idade",
  "profissao",
  "dataResposta",
  "acoes",
];

const ListarFichaPacientes = () => {
  const router = useRouter();
  const { data: profissionalSession } = useSession();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [rowData, setRowData] = useState([]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/paciente/anamnese/listar/${profissionalSession.id}`
        );
        const data = await response.json();
        setRowData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar as fichas dos pacientes.", error);
        setIsLoading(false);
      }
    };

    if (profissionalSession) {
      fetchData();
    }
  }, [profissionalSession]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...(rowData || [])];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nomeCompleto.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [rowData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nomeCompleto":
        return <UserDetails name={user.nomeCompleto} email={user.email} />;
      case "idade":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "profissao":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "dataResposta":
        return (
          <div className="flex flex-col ml-1">
            <p className="text-bold text-small capitalize">
              {format(new Date(cellValue), "dd/MM/yyyy")}
            </p>
          </div>
        );
      case "acoes":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Ver Resultado">
              <button
                className=" text-lg cursor-pointer active:opacity-50"
                onClick={() =>
                  router.push(
                    `/paciente/anamnese/resultado/${user.idFormulario}`
                  )
                }
              >
                <EyeIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-3">
        <div className="flex justify-between items-end">
          <p className="flex text-2xl w-[100%] text-primary items-center ml-4">
            Fichas anamnese por paciente
          </p>
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procurar pelo nome..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    rowData,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <label className="flex items-center text-black text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </label>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            className="border border-black"
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="border border-black"
          >
            Próxima
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen">
        <Spinner type="points" size="lg" />
        <p className="mt-4 text-2xl p-2 text-primary">
          Carregando fichas dos pacientes...
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center pt-4 px-5">
      <Table
        className="w-[80%]"
        aria-label="lista-fichas"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Não há nenhuma ficha de paciente no momento."}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.idFormulario}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default ListarFichaPacientes;
