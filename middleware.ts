import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // ログインページのパス
  },
});

export const config = {
  matcher: ["/word/:path*", "/deck/:path*", "/quiz/:path*"], // 認証が必要なパスを指定
};
