import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes inside the matcher to be more performant
export const config = {
  matcher: [
    "/((?!_next|api/auth|profissional/login|paciente/anamnese/preencher|paciente/anamnese/ficha).*)(.+)",
  ],
};

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/profissional/login", req.url));
  }

  return NextResponse.next();
}
