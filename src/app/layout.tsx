import "./globals.css";
import type { Metadata } from "next";
import theme from "./theme";
import RecoilRootWrapper from "@/lib/recoilWapper";
import Layout from "../components/layout/layout";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "../lib/next-auth"; // 클라이언트 전용 컴포넌트

export const metadata: Metadata = {
  title: "Pide",
  description: "길찾기와 여행루트를 한번에 볼 수 있는 웹사이트",
  icons: {
    icon: "/favi.png",
  },
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
      <head>
        <script
          type="text/javascript"
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          defer
        ></script>
      </head>
      <body className="m-0 h-screen overflow-auto">
        <ThemeProvider theme={theme}>
          <RecoilRootWrapper>
            <AuthProvider>
              <Layout>
                <main>{children}</main>
              </Layout>
            </AuthProvider>
          </RecoilRootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
