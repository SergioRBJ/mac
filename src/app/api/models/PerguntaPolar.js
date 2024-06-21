import mongoose from "mongoose";

const PerguntaPolarSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    texto: {
      type: String,
      required: [true, "Texto da pergunta é obrigatório"],
    },
    grupos: [
      {
        type: String,
      },
    ],
  },
  { collection: "perguntas_polar", timestamps: true }
);

export default mongoose.models.PerguntaPolar ||
  mongoose.model("PerguntaPolar", PerguntaPolarSchema);
