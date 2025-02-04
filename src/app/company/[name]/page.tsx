import { ThemeProvider } from "@/components/theme_provider";
import ThemeToggle from "@/components/theme_toggle";
import RadarChartCard from "@/components/RadarChartCard";
import LineChartCard from "@/components/LineChartCard";
import AreaChartCard from "@/components/AreaChartCard";
import ProductCard from "@/components/ProductCard";
import BackToTop from "@/components/BackToTop";
import BackToHome from "@/components/BackToHome";
import Footer from "@/components/footer";
import { Timeline } from "@/components/ui/timeline";
import { ProductDataProps, TimelineProps } from "@/lib/props";
import data from "@/data/data.json";

// async function getData(name: string) {
//   const res = await fetch(`http://localhost:3000/api/company/${name}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Page({ params }: { params: { name: string } }) {
  // const data = await getData(params.name);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <header
        className="w-full h-[240px] md:h-[320px] brightness-50 bg-slate-700 bg-cover bg-center relative"
        style={{ backgroundImage: `url(/images/img1_.jpg)` }}
      />
      <nav className="fixed top-0 z-50 p-4 flex justify-between w-full">
        <BackToHome />
        <ThemeToggle />
      </nav>
      <div className="size-36 bg-accent rounded-full absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="bg-dot-28-s-2-foreground/20 p-4">
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-3 px-4 md:px-8 flex justify-between items-center">
            <p className="text-md text-justify">
              アップルは、1976年にスティーブ・ジョブズ、スティーブ・ウォズニアック、ロン・ウェインによって設立されたアメリカの多国籍技術会社です。アップルは、Macコンピュータ、iPod、iPhone、iPadなど、世界的に有名なコンピューターや消費者向けエレクトロニクス製品を開発、販売しています。アップルは、技術の先端を追求し、ユーザー体験を向上させることを目指しています。将来的には、人工知能、5Gネットワーク、健康管理など、新しい技術領域に進出を目指しています。アップルは、世界中のユーザーに、より良い生活を提供するためのイノベーションを続けていくことを目指しています。
            </p>
          </div>
          <ProductCard
            className="col-span-1 md:col-span-2"
            data={ProductData}
          />
          <RadarChartCard
            className="col-span-1 md:col-span-2"
            data={RadarChartData}
          />
          <AreaChartCard
            className="col-span-1 md:col-span-3"
            data={AreaChartData}
          />
          <LineChartCard
            className="col-span-1 md:col-span-5"
            data={LineChartData}
          />
        </section>
        <Timeline data={timeline} />
      </div>
      <BackToTop />
      <Footer name="HAL東京 リュウチャーウェイ" />
    </ThemeProvider>
  );
}

const ProductData: ProductDataProps[] = data[0].product as ProductDataProps[];
const RadarChartData: number[] = data[0].radarchart as number[];
const AreaChartData: number[] = data[0].areachart as number[];
const LineChartData: number[] = data[0].googletrend as number[];
const timeline: TimelineProps[] = data[0]
  .timeline as unknown as TimelineProps[];
