import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/app/api/lib/mongodb";
import ProfissionalSaude from "@/app/api/models/ProfissionalSaude";
import bcrypt from "bcrypt";

export const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const dbName = process.env.MONGODB_DATABASE;
        await connectToDatabase(dbName);

        const profissional = await ProfissionalSaude.findOne({
          email: credentials.email,
        });

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          profissional.password
        );

        if (isPasswordValid) {
          if (profissional.status === "TEST_EXPIRED") {
            throw new Error("TEST_EXPIRED");
          }

          const currentTimestamp = Date.now();
          if (
            profissional.subscriptionEndDate &&
            profissional.subscriptionEndDate < currentTimestamp
          ) {
            throw new Error("SUBSCRIPTION_EXPIRED");
          }

          return {
            id: profissional._id,
            name: profissional.nomeCompleto,
            email: profissional.email,
            subscriptionEndDate: profissional.subscriptionEndDate,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      return token;
    },
  },
  secret: process.env.NEXTAUTH_JWT_SECRET,
};
