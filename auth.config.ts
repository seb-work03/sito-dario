import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe subset of the NextAuth config. This is what the middleware
 * imports — it MUST NOT reference bcryptjs or the database. The full config
 * (which does both) lives in `auth.ts` and is used by the Node runtime.
 */
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.name = user.name;
        token.sessionVersion = user.sessionVersion ?? 0;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.id = String(token.uid);
        session.user.name = String(token.name ?? "");
        session.user.sessionVersion = Number(token.sessionVersion ?? 0);
      }
      return session;
    },
  },
};
