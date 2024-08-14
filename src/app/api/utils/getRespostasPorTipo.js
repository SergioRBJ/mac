const getRespostasPorTipo = ({ respostas, perguntas, tipo }) => {
  const perguntasPorTipo = perguntas.filter((pergunta) => {
    return pergunta.tipo === tipo;
  });

  const response = perguntasPorTipo
    .map((pergunta) => {
      const resposta = respostas.find((resposta) => {
        return pergunta._id.toString() === resposta.perguntaId;
      });
      return {
        pergunta: pergunta.pergunta,
        resposta: resposta.resposta,
      };
    })
    .filter(
      (questionario) =>
        questionario.resposta && questionario.resposta !== "null"
    );

  return response;
};

export { getRespostasPorTipo };
