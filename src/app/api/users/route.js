import Paciente from "@/app/api/models/Paciente";
import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export function GET(request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}

export async function POST(request) {
  try {
    const dbName = process.env.MONGODB_DATABASE;

    await connectToDatabase(dbName);
    const body = await request.json();

    const {
      nomeCompleto,
      idade,
      dataNascimento,
      estadoCivil,
      profissao,
      peso,
      altura,
      tipoSanguineo,
      simOuNao,
    } = body;

    const paciente = await Paciente.create({
      nomeCompleto,
      idade,
      dataNascimento,
      estadoCivil,
      profissao,
      peso,
      altura,
      tipoSanguineo,
    });

    const respostas = Object.keys(simOuNao).map((perguntaId) => ({
      perguntaId,
      resposta: simOuNao[perguntaId] === "true",
    }));

    await PacienteRespostaFormulario.create({
      pacienteId: paciente._id,
      respostas,
    });

    return new Response(
      JSON.stringify({ success: true, data: { paciente, respostas } }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}