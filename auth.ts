import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = String(credentials?.username ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!username || !password) return null;

        const [user] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.username, username))
          .limit(1);

        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: String(user.id), name: user.username };
      },
    }),
  ],
});
