import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema(
  {
    nomeCompleto: {
      type: String,
    },
    email: {
      type: String,
    },
    dataNascimento: {
      type: Date,
    },
    tipoSanguineo: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  },
  { collection: "pacientes", timestamps: true }
);

export default mongoose.models.Paciente ||
  mongoose.model("Paciente", PacienteSchema);
