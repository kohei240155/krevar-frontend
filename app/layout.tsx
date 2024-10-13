import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Footer } from "../features/routes/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KREVAR - Vocabulary Memorization App",
  description: "An app to help you memorize vocabulary using images.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8139284305730911"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ width: "90%", maxWidth: "350px" }}
            />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
