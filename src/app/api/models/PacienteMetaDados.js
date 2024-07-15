import mongoose from "mongoose";
import { boolean } from "zod";

const PacienteMetaDadosSchema = new mongoose.Schema(
  {
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
    profissionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profissional",
    },
    responderFormularioAnamnese: {
      type: Boolean,
    },
  },
  { collection: "pacientes_meta_dados", timestamps: true }
);

export default mongoose.models.PacienteMetaDados ||
  mongoose.model("PacienteMetaDados", PacienteMetaDadosSchema);
