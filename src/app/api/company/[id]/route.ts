import { NextResponse } from "next/server";
import { CompanyProps } from "@/lib/props";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // 文字列を数値に変換
  const companyId = parseInt(params.id, 10);
  // data.jsonから該当する会社を取得
  const data = await fetch(`/data/data.json`);
  const companies: CompanyProps[] = await data.json();
  const company = companies.find((item) => item.id === companyId);
  // 該当する会社が見つからない場合 (404)

  if (!company) {
    return new NextResponse("資料が見つかりません", { status: 404 });
  }
  // 該当する会社をJSON形式で返す
  return NextResponse.json(company);
}
