import PacienteRespostaFormulario from "@/app/api/models/PacienteRespostaFormulario";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);
    const { idFicha } = params;

    const ficha = await PacienteRespostaFormulario.findOne({
      _id: idFicha,
    }).exec();

    return new Response(JSON.stringify({ success: true, data: ficha }), {
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
