import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // ログインページのパス
  },
});

export const config = {
  matcher: ["/words/:path*", "/decks/:path*"], // 認証が必要なパスを指定
};