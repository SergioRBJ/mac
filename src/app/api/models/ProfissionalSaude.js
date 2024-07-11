import mongoose from "mongoose";

const ProfissionalSaudeSchema = new mongoose.Schema(
  {
    nomeCompleto: String,
    email: { type: String, unique: true },
    password: String,
  },
  { collection: "profissionais_saude", timestamps: true }
);

const ProfissionalSaude =
  mongoose.models.ProfissionalSaude ||
  mongoose.model("ProfissionalSaude", ProfissionalSaudeSchema);

export default ProfissionalSaude;
