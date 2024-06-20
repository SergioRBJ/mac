import Paciente from "@/app/api/models/Paciente";
import connectToDatabase from "@/app/api/lib/mongodb";

export const dynamic = "force-dynamic";

export function GET(request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}

export async function POST(request) {
  try {
    await connectToDatabase(process.env.MONGODB_DATABASE);
    const body = await request.json();
    const paciente = await Paciente.create(body);
    return new Response(JSON.stringify({ success: true, data: paciente }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
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
