import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Layout from "../components/layout/layout";
import { Jua } from "next/font/google";
import Script from "next/script";

// @를 떼주자

//
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-[url('/img/background.png')] bg-cover bg-center`}>
        <Layout>
          <Script
            type="text/javascript"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&callback=CALLBACK_FUNCTION`}
          />
          <main>{children}</main>
        </Layout>
      </body>
    </html>
  );
}
