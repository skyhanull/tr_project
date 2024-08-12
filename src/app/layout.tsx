import "./globals.css";
import type { Metadata } from "next";
import theme from "./theme";
import RecoilRootWrapper from "@/lib/recoilWapper";
import Layout from "../components/layout/layout";
import { Jua } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import Provider from "../lib/next-auth";
// const inter = Inter({ subsets: ["latin"] });

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
//className="h-full bg-[url('/img/background.png')] bg-cover bg-center overflow-auto"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 h-screen overflow-auto">
        {/* <div className="h-full bg-[url('/img/backgroundImg.png')] bg-cover bg-center overflow-auto"> */}
        <div>
          <ThemeProvider theme={theme}>
            <RecoilRootWrapper>
              <Provider>
                <Layout>
                  <script
                    type="text/javascript"
                    src="https://developers.kakao.com/sdk/js/kakao.min.js"
                    defer
                  ></script>
                  <main>{children}</main>
                </Layout>
              </Provider>
            </RecoilRootWrapper>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
