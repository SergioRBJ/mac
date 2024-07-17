import mongoose from "mongoose";

const GrupoSchema = new mongoose.Schema({
  grupo: {
    type: String,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
});

const PerguntaSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    pergunta: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    grupos: [GrupoSchema],
  },
  { collection: "perguntas_v2", timestamps: true }
);

export default mongoose.models.Pergunta ||
  mongoose.model("Pergunta", PerguntaSchema);
