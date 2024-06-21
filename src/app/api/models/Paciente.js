import mongoose from "mongoose";

const PacienteSchema = new mongoose.Schema(
  {
    nomeCompleto: {
      type: String,
      required: [true, "Nome completo é obrigatório"],
    },
    idade: {
      type: Number,
      required: [true, "Idade é obrigatória"],
      min: [0, "Idade não pode ser negativa"],
    },
    dataNascimento: {
      type: Date,
      required: [true, "Data de nascimento é obrigatória"],
    },
    estadoCivil: {
      type: String,
      enum: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"],
      required: [true, "Estado civil é obrigatório"],
    },
    profissao: {
      type: String,
      required: [true, "Profissão é obrigatória"],
    },
    peso: {
      type: Number,
      required: [true, "Peso é obrigatório"],
      min: [0, "Peso não pode ser negativo"],
    },
    altura: {
      type: Number,
      required: [true, "Altura é obrigatória"],
      min: [0, "Altura não pode ser negativa"],
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
