import connectToDatabase from "@/app/api/lib/mongodb";
import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    console.log(request, "request");
    console.log(params, "params");

    const paciente = await Paciente.findOne({ email: params.email }).exec();

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
      { $set: { responderFormularioAnamnese } },
      { new: true }
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

    return new Response(_, {
      status: 204,
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
