import connectToDatabase from "@/app/api/lib/mongodb";
import Paciente from "@/app/api/models/Paciente";
import PacienteMetaDados from "@/app/api/models/PacienteMetaDados";
import { HttpResponse } from "@/app/api/shared/http";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nomeCompleto, email } = body;
    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    const paciente = await Paciente.findOne({ email }).exec();

    if (!paciente) {
      const pacienteCriado = await Paciente.create({
        nomeCompleto,
        email,
      });

      await PacienteMetaDados.create({
        pacienteId: pacienteCriado._id,
        responderFormularioAnamnese: true,
      });

      return HttpResponse.success({
        status: 201,
      });
    } else {
      const pacienteMetaDadosAlterado =
        await PacienteMetaDados.findOneAndUpdate(
          { pacienteId: paciente._id },
          { $set: { responderFormularioAnamnese: true } },
          { new: true }
        ).exec();

      if (!pacienteMetaDadosAlterado)
        return HttpResponse.error({
          status: 404,
          errorMessage: "Meta dados do paciente não encontrado",
        });

      return HttpResponse.success({ status: 201 });
    }
  } catch (error) {
    console.log(error);
    return HttpResponse.error({ status: 400, error: error.message });
  }
}
