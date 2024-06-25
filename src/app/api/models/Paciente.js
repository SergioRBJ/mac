import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema(
  {
    nomeCompleto: {
      type: String,
      required: [true, "Nome completo é obrigatório"],
    },
    dataNascimento: {
      type: Date,
      required: [true, "Data de nascimento é obrigatória"],
    },
    tipoSanguineo: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Tipo sanguíneo é obrigatório"],
    },
  },
  { collection: "pacientes", timestamps: true }
);

export default mongoose.models.Paciente ||
  mongoose.model("Paciente", PacienteSchema);
