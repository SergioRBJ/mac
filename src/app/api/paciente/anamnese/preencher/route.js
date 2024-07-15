import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";
import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import { calculateAge } from "@/app/api/utils/calculateAge";
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
      dataNascimento,
      estadoCivil,
      profissao,
      peso,
      altura,
      tipoSanguineo,
      simOuNao,
      multiplaEscolha,
      email,
    } = body;

    const paciente = await Paciente.findOneAndUpdate(
      { email },
      {
        $set: {
          dataNascimento,
          estadoCivil,
          profissao,
          peso,
          altura,
          tipoSanguineo,
        },
      },
      { new: true }
    ).exec();

    if (!paciente) {
      return new Response(
        JSON.stringify({ success: false, error: "Paciente não encontrado" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const updatedPacienteMetaDados = await PacienteMetaDados.findOneAndUpdate(
      { pacienteId: paciente._id },
      { $set: { responderFormularioAnamnese: false } },
      { new: true, upsert: true }
    ).exec();

    if (!updatedPacienteMetaDados) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Meta dados do paciente não encontrado",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const respostasSimOuNao = Object.keys(simOuNao).map((perguntaId) => ({
      perguntaId,
      resposta: simOuNao[perguntaId],
    }));

    const respostasMultiplaEscolha = Object.keys(multiplaEscolha).map(
      (perguntaId) => ({
        perguntaId,
        resposta: multiplaEscolha[perguntaId],
      })
    );

    const respostas = [...respostasSimOuNao, ...respostasMultiplaEscolha];

    console.log(
      updatedPacienteMetaDados.profissionalId,
      "updatedPacienteMetaDados.profissionalId"
    );

    await PacienteRespostaFormulario.create({
      pacienteId: paciente._id,
      profissionalId: updatedPacienteMetaDados.profissionalId,
      idade: calculateAge(dataNascimento),
      estadoCivil,
      profissao,
      peso,
      altura,
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
    console.log(error);
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
