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

        if (profissional) {
          return {
            id: profissional._id,
            name: profissional.nameCompleto,
            email: profissional.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // the user present here gets the same data as received
      // from DB call  made above -> fetchUserInfo(credentials.opt)
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      // user param present in the session(function) does not recive
      //all the data from DB call -> fetchUserInfo(credentials.opt)
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
};
