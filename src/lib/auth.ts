import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { redis } from "./db";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!googleClientId || !googleClientSecret) {
    throw new Error("Missing Google credentials");
  }
  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [GoogleProvider(getGoogleCredentials())],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await redis.get(`user:${token.id}`)) as User | null;

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
