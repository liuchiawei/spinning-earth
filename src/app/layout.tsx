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
  title: "ポートフォリオ",
  description: "ポートフォリオ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} ${notoSansJP.variable} antialiased`}>
        <div className="h-screen w-full relative pointer-events-none z-0 overflow-hidden">
          <div className="w-screen absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 gap-2 flex flex-col justify-center items-center md:items-start z-10 *:text-white text-center md:text-left">
            <h1 className="text-3xl md:text-6xl font-bold">
              世界を揺るがす企業
            </h1>
            <h2 className="text-md md:text-xl">未来を創る、今ここに。</h2>
          </div>
          <div className="absolute bottom-8 left-8 z-10 text-white/50">
            <h3>ドラッグしてカメラを移動</h3>
            <h3>スクロールしてズームイン／アウト</h3>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
