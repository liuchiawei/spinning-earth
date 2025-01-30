import type { Metadata } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "世界を揺るがす企業",
  description: "ポートフォリオ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} ${notoSansJP.variable} antialiased bg-gray-900`}>
        <div className="h-screen w-full relative pointer-events-none z-0 overflow-hidden">
          <div className="w-screen absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 gap-2 flex flex-col justify-center items-center md:items-start z-10 text-center md:text-left">
            <h1 className="text-3xl md:text-6xl font-bold text-white">
              世界を揺るがす企業
            </h1>
            <h2 className="text-md md:text-xl text-gray-100">未来を創る、今ここに。</h2>
          </div>
          <div className="absolute bottom-8 left-8 z-10 text-sm md:text-xl text-gray-100">
            <h3>ドラッグして画面を回転</h3>
            <h3>スクロールして画面を拡大</h3>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
