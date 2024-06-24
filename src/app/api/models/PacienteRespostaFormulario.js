import mongoose from "mongoose";

const PacienteRespostaFormularioSchema = new mongoose.Schema(
  {
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
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
