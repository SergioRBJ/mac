import bcrypt from "bcrypt";
import connectToDatabase from "@/app/api/lib/mongodb";
import ProfissionalSaude from "@/app/api/models/ProfissionalSaude";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(
      req,
      {
        getHeader: (name) => req.headers.get(name),
        setHeader: (name, value) => req.headers.set(name, value),
      },
      options
    );

    if (!session) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const dbName = process.env.MONGODB_DATABASE;
    await connectToDatabase(dbName);

    const { senhaAntiga, novaSenha } = await req.json();

    const profissional = await ProfissionalSaude.findById(session.sub);

    if (!profissional) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    const senhaAntigaValida = await bcrypt.compare(
      senhaAntiga,
      profissional.password
    );

    if (!senhaAntigaValida) {
      return NextResponse.json(
        { message: "Senha antiga incorreta." },
        { status: 400 }
      );
    }

    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

    profissional.password = hashedNovaSenha;
    await profissional.save();

    return NextResponse.json(
      { message: "Senha atualizada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao trocar a senha." },
      { status: 500 }
    );
  }
}
