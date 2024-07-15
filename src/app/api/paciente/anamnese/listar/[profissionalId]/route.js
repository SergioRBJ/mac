import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);
    const { profissionalId } = params;

    const formularios = await PacienteRespostaFormulario.find({
      profissionalId,
    })
      .populate("pacienteId", "nomeCompleto email")
      .exec();

    const resultado = formularios.map((formulario) => ({
      idPaciente: formulario.pacienteId._id,
      idFormulario: formulario._id,
      nomeCompleto: formulario.pacienteId.nomeCompleto,
      email: formulario.pacienteId.email,
      idade: formulario.idade,
      profissao: formulario.profissao,
      dataResposta: formulario.createdAt,
    }));

    return new Response(JSON.stringify({ success: true, data: resultado }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
