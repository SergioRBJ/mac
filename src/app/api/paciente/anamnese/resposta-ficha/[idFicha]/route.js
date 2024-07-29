import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import Paciente from "@/app/api/models/Paciente";
import Pergunta from "@/app/api/models/Pergunta";
import connectToDatabase from "@/app/api/lib/mongodb";
import { calculateAnamnesis } from "@/app/api/utils/calculateAnamnesis";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);
    const { idFicha } = params;

    const ficha = await PacienteRespostaFormulario.findOne({
      _id: idFicha,
    }).exec();

    const paciente = await Paciente.findOne({
      _id: ficha.pacienteId,
    }).exec();

    const perguntas = await Pergunta.find().lean();

    const resultado = calculateAnamnesis(ficha.respostas, perguntas);

    const data = {
      nomeCompleto: paciente.nomeCompleto,
      email: paciente.email,
      idade: ficha.idade,
      peso: ficha.peso,
      altura: ficha.altura,
      estadoCivil: ficha.estadoCivil,
      tipoSanguineo: paciente.tipoSanguineo,
      profissao: ficha.profissao,
      resultado,
    };

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
