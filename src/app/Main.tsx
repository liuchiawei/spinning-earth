"use client";

import SpinCarousel from "@/components/SpinCarousel";
import InfoCard from "@/components/InfoCard";
import { CompanyProps } from "@/lib/props";
import { useState } from "react";

export default function Main() {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  return (
    <main className="w-screen h-screen relative">
      <div className="w-full h-full relative z-0">
        <SpinCarousel
          db={db}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      </div>
      {selectedCardId && (
        <InfoCard
          id={db[selectedCardId - 1].id}
          title={db[selectedCardId - 1].title}
          description={db[selectedCardId - 1].description}
          url={db[selectedCardId - 1].url}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      )}
    </main>
  );
}

const db: CompanyProps[] = [
  {
    id: 1,
    title: "Apple",
    description:
      "直感的なデバイスとエコシステムを提供し、デジタルライフをシンプルかつ快適に。スマートフォンの普及を主導。",
    url: "/images/img1_.jpg",
    location: "Silicon Valley",
    lat: 37.323,
    lng: -122.0322,
    label: "Cupertino",
  },
  {
    id: 2,
    title: "Alphabet",
    description:
      "検索・広告・クラウド技術を通じて情報アクセスを変革。AIや自動運転技術の発展にも貢献し、日常生活やビジネスの形を再定義。",
    url: "/images/img2_.jpg",
    location: "Silicon Valley",
    lat: 37.422,
    lng: -122.0841,
    label: "Mountain View",
  },
  {
    id: 3,
    title: "Microsoft",
    description:
      "OS、クラウド、AIを通じてビジネスと個人の生産性を向上。企業や開発者向けツールの提供により、業務のデジタル化を加速。",
    url: "/images/img3_.jpg",
    location: "Redmond",
    lat: 47.64,
    lng: -122.13,
    label: "Redmond",
  },
  {
    id: 4,
    title: "Open AI",
    description:
      "AIの進化を牽引し、自然言語処理や創造的作業の自動化を推進。人々の働き方や情報取得の方法に革新をもたらす。",
    url: "/images/img4_.jpg",
    location: "Silicon Valley",
    lat: 37.7749,
    lng: -122.4194,
    label: "San Francisco",
  },
  {
    id: 5,
    title: "Amazon",
    description:
      "ECとクラウドサービスを発展させ、購買行動や物流を効率化。AI活用により、パーソナライズ化された消費体験を提供。",
    url: "/images/img5_.jpg",
    location: "Seattle",
    lat: 47.64,
    lng: -122.13,
    label: "Seattle",
  },
  {
    id: 6,
    title: "Meta",
    description:
      "SNSとメタバース技術を活用し、デジタル上の交流や経済活動を拡張。VR・ARの普及を加速し、次世代コミュニケーションを創出。",
    url: "/images/img6_.jpg",
    location: "Silicon Valley",
    lat: 37.7749,
    lng: -122.4194,
    label: "San Francisco",
  },
  {
    id: 7,
    title: "Tesla",
    description:
      "電気自動車の普及を加速し、持続可能なエネルギー社会の実現を推進。人々の移動手段やエネルギー利用の在り方を変革。",
    url: "/images/img7_.jpg",
    location: "Silicon Valley",
    lat: 37.7749,
    lng: -122.4194,
    label: "San Francisco",
  },
  {
    id: 8,
    title: "Nvidia",
    description:
      "GPU技術を進化させ、AI、ゲーム、データ処理の性能を飛躍的に向上。ディープラーニングや自動運転技術の発展を支える。",
    url: "/images/img8_.jpg",
    location: "Silicon Valley",
    lat: 37.7844,
    lng: -122.4016,
    label: "San Francisco",
  },
  {
    id: 9,
    title: "Byte Dance",
    description:
      "短尺動画プラットフォームを通じてコンテンツ消費を変革。AIによるレコメンド技術で、人々の情報取得やエンタメの嗜好を変える。",
    url: "/images/img9_.jpg",
    location: "Beijing",
    lat: 39.9042,
    lng: 116.3974,
    label: "Beijing",
  },
  {
    id: 10,
    title: "Space X",
    description:
      "宇宙開発のコストを劇的に削減し、民間宇宙事業を拡大。火星移住計画を推進し、宇宙旅行の新たな可能性を開く。",
    url: "/images/img10_.jpg",
    location: "Hawthorne",
    lat: 33.9203,
    lng: -118.3353,
    label: "Hawthorne",
  },
];
