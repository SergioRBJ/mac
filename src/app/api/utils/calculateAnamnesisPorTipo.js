import { tipoPerguntaAnamnese } from "@/app/api/shared/constants";

const calculateAnamnesisPorTipo = (respostas, perguntas, tipo) => {
  // AGRUPA PERGUNTAS PELO TIPO FORNECIDO
  const perguntasPorTipo = perguntas.filter(
    (pergunta) => pergunta.tipo === tipo
  );

  const perguntasPeso = perguntasPorTipo.map((pergunta) => {
    return {
      pergunta: pergunta.pergunta,
      peso: pergunta.grupos[0].peso,
      tipo: pergunta.tipo,
      id: pergunta._id.toString(),
    };
  });

  const agrupamentoPerguntas = {
    value: tipo,
    label: tipoPerguntaAnamnese.find((item) => item[tipo])[tipo].toUpperCase(),
    perguntas: perguntasPeso,
  };

  // CALCULA PONTUAÇÃO POR TIPO
  // SOMA TODOS OS PESOS DAS PERGUNTAS DO TIPO
  // SOMA TODOS OS PESOS DAS RESPOSTAS DO TIPO
  // SIM = 5, NÃO = 0, FREQUENTEMENTE = 100% DO PESO DA PERGUNTA, AS_VEZES = 75% DO PESO DA PERGUNTA, RARO_NUNCA = 0
  // PONTUAÇÃO = (RESPOSTA * PESO) / SOMA DE TODOS OS PESOS
  const somaPesos = perguntasPeso.reduce((acc, pergunta) => {
    return acc + pergunta.peso;
  }, 0);

  const somaRespostas = respostas.reduce((acc, resposta) => {
    const pergunta = agrupamentoPerguntas.perguntas.find(
      (pergunta) => pergunta.id === resposta.perguntaId
    );

    if (!pergunta) return acc;

    switch (resposta.resposta) {
      case "true":
        return acc + pergunta.peso;
      case "false":
        return acc;
      case "FREQUENTEMENTE":
        return acc + pergunta.peso;
      case "AS_VEZES":
        return acc + pergunta.peso * 0.75;
      case "RARO_NUNCA":
        return acc;
      default:
        return acc;
    }
  }, 0);

  const tipoResposta = [
    "true",
    "false",
    "FREQUENTEMENTE",
    "AS_VEZES",
    "RARO_NUNCA",
  ];

  // CALCULAR QUANTIDADE DE RESPOSTAS POR TIPO DE RESPOSTA "true", "false", "FREQUENTEMENTE", "AS_VEZES", "RARO_NUNCA",
  // POR GRUPO
  const quantidadeTipoResposta = tipoResposta.map((tipo) => {
    const quantidade = respostas.filter((resposta) => {
      const pergunta = agrupamentoPerguntas.perguntas.find(
        (pergunta) => pergunta.id === resposta.perguntaId
      );

      if (!pergunta) return false;

      return resposta.resposta === tipo;
    }).length;

    return {
      tipo,
      quantidade,
    };
  });

  // FUNCAO DEVE RETORNAR UM ARRAY COM OBJETOS [{tipo: "FREEQUENTEMENTE_TRUE", quantidade: 0}, {tipo: "RARO_NUNCA_FALSE", quantidade: 0}, {tipo: "AS_VEZES", quantidade: 0}]
  // somar A QUANTIDADE DE RESPOSTAS POR TIPO DE RESPOSTA (FREEQUENTEMENTE + true), (RARO_NUNCA + false), AS_VEZES
  const agrupamentoTipoResposta = quantidadeTipoResposta.reduce(
    (acc, tipoResposta) => {
      const tipo = tipoResposta.tipo;
      const quantidade = tipoResposta.quantidade;

      if (tipo === "true" || tipo === "FREQUENTEMENTE") {
        const tipoFrequente = acc.find(
          (item) => item.tipo === "FREQUENTEMENTE_TRUE"
        );

        if (tipoFrequente) {
          tipoFrequente.quantidade += quantidade;
        } else {
          acc.push({
            tipo: "FREQUENTEMENTE_TRUE",
            label: "Frequentemente ou Sim",
            quantidade,
          });
        }
      } else if (tipo === "AS_VEZES") {
        const tipoAsVezes = acc.find((item) => item.tipo === "AS_VEZES");

        if (tipoAsVezes) {
          tipoAsVezes.quantidade += quantidade;
        } else {
          acc.push({
            tipo: "AS_VEZES",
            label: "Às vezes",
            quantidade,
          });
        }
      } else if (tipo === "false" || tipo === "RARO_NUNCA") {
        const tipoRaro = acc.find((item) => item.tipo === "RARO_NUNCA_FALSE");

        if (tipoRaro) {
          tipoRaro.quantidade += quantidade;
        } else {
          acc.push({
            tipo: "RARO_NUNCA_FALSE",
            label: "Raro/Nunca ou Não",
            quantidade,
          });
        }
      }

      return acc;
    },
    []
  );

  return {
    value: agrupamentoPerguntas.value,
    label: agrupamentoPerguntas.label,
    total: somaPesos,
    pontuacao: Math.round(somaRespostas),
    porcentagem: ((somaRespostas / somaPesos) * 100).toFixed(2),
    quantidadeTipoResposta: [
      ...agrupamentoTipoResposta,
      {
        tipo: "TOTAL",
        quantidade: agrupamentoTipoResposta.reduce(
          (acc, item) => acc + item.quantidade,
          0
        ),
        label: "Total",
      },
    ],
  };
};

export { calculateAnamnesisPorTipo };
