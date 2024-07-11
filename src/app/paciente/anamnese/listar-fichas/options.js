const columns = [
  { name: "ID", uid: "idFormulario", sortable: true },
  { name: "NOME COMPLETO", uid: "nomeCompleto", sortable: true },
  { name: "IDADE", uid: "idade", sortable: true },
  { name: "PROFISSÃO", uid: "profissao", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "DATA RESPOSTA", uid: "dataResposta" },
  { name: "AÇÕES", uid: "acoes" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
