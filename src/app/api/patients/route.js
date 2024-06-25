import connectToDatabase from "@/app/api/lib/mongodb";
import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const dbName = process.env.MONGODB_DATABASE;

    await connectToDatabase(dbName);
    const body = await request.json();

    const { nomeCompleto, email } = body;

    const paciente = await Paciente.create({
      nomeCompleto,
      email,
    });

    const pacienteMetaDados = await PacienteMetaDados.create({
      pacienteId: paciente._id,
      responderFormularioAnamnese: true,
    });

    return new Response(
      JSON.stringify({ success: true, data: { paciente, pacienteMetaDados } }),
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
