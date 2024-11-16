import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      picture: string;
    };
    idToken: string;
  }
}

// NextAuth のインスタンスを handler としてエクスポート
const handler = NextAuth({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (!token.sub || !token.email || !token.name || !token.picture) {
          throw new Error("トークンが不完全です");
        }
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.picture = token.picture;
        // idToken をセッションに追加
        session.idToken = token.id_token as string;
      } else {
        throw new Error("sessionが存在しません");
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
