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
          <div className="bg-dot-32-s-1-foreground/50 h-screen w-full relative pointer-events-none z-0">
            <div className="absolute top-8 left-8 gap-2 flex flex-col justify-center items-center md:items-start z-10 *:text-white">
            <h1 className="text-6xl font-bold">世界を揺るがす企業</h1>
            <h2 className="text-xl">未来を創る、今ここに。</h2>
          </div>
            {children}
          </div>
      </body>
    </html>
  );
}
