import "./globals.css";
import type { Metadata } from "next";
import theme from "./theme";
import RecoilRootWrapper from "@/components/recoilWapper";
import Layout from "../components/layout/layout";
import { Jua } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pide",
  description: "길찾기와 여행루트를 한번에 볼 수 있는 웹사이트",
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
        <div className="h-full bg-[url('/img/background.png')] bg-cover bg-center overflow-auto">
          <ThemeProvider theme={theme}>
            <RecoilRootWrapper>
              <Layout>
                {/* <Script
                type="text/javascript"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&callback=CALLBACK_FUNCTION`}
              /> */}
                {/* <Script
                // type="text/javascript"

                src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JS_KAKAO_CLIENT_KEY}&libraries=services&autoload=false`}
              /> */}
                <script
                  type="text/javascript"
                  src="https://developers.kakao.com/sdk/js/kakao.min.js"
                  defer
                ></script>
                <main>{children}</main>
              </Layout>
            </RecoilRootWrapper>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
