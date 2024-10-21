import mongoose from "mongoose";

const PacienteRespostaFormularioSchema = new mongoose.Schema(
  {
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
    profissionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profissional",
    },
    idade: {
      type: Number,
      required: [true, "Idade é obrigatória"],
      min: [0, "Idade não pode ser negativa"],
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
    estadoCivil: {
      type: String,
      enum: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"],
      required: [true, "Estado civil é obrigatório"],
    },
    profissao: {
      type: String,
      required: [true, "Profissão é obrigatória"],
    },
    remedios: {
      type: String,
    },
    doencaCronica: {
      type: String,
    },
    anotacoes: {
      type: String,
    },
    respostas: [
      {
        perguntaId: String,
        resposta: String,
      },
    ],
  },
  { collection: "pacientes_resposta_formulario", timestamps: true }
);

const PacienteRespostaFormulario =
  mongoose.models.PacienteRespostaFormulario ||
  mongoose.model(
    "PacienteRespostaFormulario",
    PacienteRespostaFormularioSchema
  );

export default PacienteRespostaFormulario;
