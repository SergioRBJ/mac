import connectToDatabase from "@/app/api/lib/mongodb";
import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    console.log(request, "request");
    console.log(params, "params");

    const paciente = await Paciente.findOne({ email: params.email }).exec();
    console.log(paciente, "paciente");
    const pacienteMetaDados = await PacienteMetaDados.findOne({
      pacienteId: paciente._id,
    }).exec();

    const data = {};

    return new Response(JSON.stringify({ success: true, data: {} }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
