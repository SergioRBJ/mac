import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  const { idFicha } = params;
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    const body = await request.json();
    const { anotacoes } = body;

    if (!anotacoes) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Campo 'anotacoes' é obrigatório",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const updatedRespostaFormulario =
      await PacienteRespostaFormulario.findOneAndUpdate(
        { _id: idFicha },
        { $set: { anotacoes } },
        { new: true, upsert: true }
      ).exec();

    if (!updatedRespostaFormulario) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Resposta do formulário do paciente não encontrada",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedRespostaFormulario }),
      {
        status: 200,
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
