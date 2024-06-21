import PerguntaPolar from "@/app/api/models/PerguntaPolar";
import PerguntaMultiplaEscolha from "@/app/api/models/PerguntaMultiplaEscolha";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const dbName = process.env.MONGODB_DATABASE;

    await connectToDatabase(dbName);

    const perguntasPolar = await PerguntaPolar.find().lean();
    const perguntasMultiplaEscolha =
      await PerguntaMultiplaEscolha.find().lean();

    return new Response(
      JSON.stringify({ perguntasPolar, perguntasMultiplaEscolha }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
