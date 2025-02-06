import { notFound } from "next/navigation";
import Image from "next/image";
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
import { ProductDataProps, TimelineProps, CompanyProps } from "@/lib/props";
import NextPageBtn from "@/components/NextPageBtn";

interface CompanyPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 全ての会社データを取得関数
 * @returns data.json( all companies )
 */
async function getData() {
  const res = await fetch("http://localhost:3000/data/data.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: CompanyPageProps) {
  const { id } = await params;
  // パラメーターから会社IDを取得、数値化
  const companyId = parseInt(id, 10);
  // companyIdが数値でない場合は404
  if (isNaN(companyId)) return notFound();
  // すべての会社データをjson形式で取得
  const companies: CompanyProps[] = await getData();
  // 該当する会社を取得
  const company = companies.find((item) => item.id === companyId);
  // 該当する会社が見つからない場合は404
  if (!company) return notFound();
  // 該当する会社のデータを取得
  if (company) {
    const ProductData: ProductDataProps = {
      productName: company.productName,
      productImage: company.productImage,
      productDescription: company.productDescription,
    };
    const RadarChartData: number[] = company.radarchart as number[];
    const AreaChartData: number[] = company.areachart as number[];
    const LineChartData: number[] = company.googletrend as number[];
    const timeline: TimelineProps[] =
      company.timeline as unknown as TimelineProps[];

    const nextCompanyId = (companyId % 10) + 1;
    const prevCompanyId = ((companyId + 8) % 10) + 1;

    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <header
          className="w-full h-[320px] bg-slate-700 bg-cover bg-center relative flex flex-col items-center justify-center gap-2"
          style={{ backgroundImage: `url(/images/img${companyId}_.jpg)` }}
        >
          <div className="absolute w-full h-full bg-black/50 z-0" />
          <div className="size-40 flex items-center justify-center bg-white rounded-full z-10 overflow-hidden">
            <Image
              src={`/images/logos/logo_${company.stringId}.svg`}
              alt={company.name}
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-white text-2xl font-bold z-10">{company.name}</h1>
        </header>
        <nav className="fixed top-0 z-50 p-4 flex justify-between w-full">
          <BackToHome />
          <ThemeToggle />
        </nav>
        <div className="bg-dot-28-s-2-foreground/20 p-4">
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-7xl mx-auto">
            <div className="col-span-1 md:col-span-3 px-4 md:px-8 flex justify-between items-center">
              <p className="text-md text-justify">{company.about}</p>
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
        <NextPageBtn
          nextCompanyId={nextCompanyId}
          prevCompanyId={prevCompanyId}
        />
        <BackToTop />
        <Footer name="HAL東京 リュウチャーウェイ" />
      </ThemeProvider>
    );
  }
}
