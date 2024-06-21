import mongoose from "mongoose";

const PerguntaMultiplaEscolhaSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    perguntas: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        pergunta: {
          type: String,
          required: true,
        },
        genero: {
          type: String,
          required: true,
        },
        grupos: [
          {
            type: String,
          },
        ],
      },
    ],
    tipo: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  { collection: "perguntas_multipla_escolha", timestamps: true }
);

export default mongoose.models.PerguntaMultiplaEscolha ||
  mongoose.model("PerguntaMultiplaEscolha", PerguntaMultiplaEscolhaSchema);
