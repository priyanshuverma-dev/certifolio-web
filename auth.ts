import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import db from "./lib/db";
import { getUserById } from "./lib/db-functions";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  callbacks: {
    session({ session, token }) {
      session.user.username = token.username as string;
      session.user.lastUsernameChangedAt = token.lastUsernameChangedAt as any;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.sub = existingUser.id;
      token.username = existingUser.username;
      token.emailVerified = existingUser.emailVerified;
      token.lastUsernameChangedAt = existingUser.lastUsernameChangedAt;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
  basePath: "/api/auth",
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth",
  },

  ...authConfig,
});
