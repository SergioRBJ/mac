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
    sexo: {
      type: String,
      enum: ["MASCULINO", "FEMININO", "OUTRO"],
    },
    tipoSanguineo: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    estadoCivil: {
      type: String,
    },
    profissao: {
      type: String,
    },
    peso: {
      type: Number,
    },
    altura: {
      type: Number,
    },
  },
  { collection: "pacientes", timestamps: true }
);

export default mongoose.models.Paciente ||
  mongoose.model("Paciente", PacienteSchema);
