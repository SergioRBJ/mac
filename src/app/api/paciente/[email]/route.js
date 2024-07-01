import connectToDatabase from "@/app/api/lib/mongodb";
import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    const paciente = await Paciente.findOne({ email: params.email }).exec();

    const pacienteMetaDados = await PacienteMetaDados.findOne({
      pacienteId: paciente._id,
    })
      .select("-createdAt -updatedAt -pacienteId -_id -__v")
      .exec();

    const data = {
      nomeCompleto: paciente.nomeCompleto,
      email: paciente.email,
      idade: paciente.idade,
      dataNascimento: paciente.dataNascimento,
      estadoCivil: paciente.estadoCivil,
      profissao: paciente.profissao,
      peso: paciente.peso,
      altura: paciente.altura,
      tipoSanguineo: paciente.tipoSanguineo,
      metadados: pacienteMetaDados,
    };

    return new Response(JSON.stringify({ success: true, data }), {
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
