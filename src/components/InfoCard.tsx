import { CardItem, CardContainer, CardBody } from "./ui/3d-card";
import Image from "next/image";
import { useMobile } from "@/hook/useMobile";

export default function InfoCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const isMobile = useMobile();
  return (
    <div className="absolute top-4 right-4 z-50 bg-transparent">
      <div className="w-[320px] md:w-[400px] h-[600px] flex flex-col items-center justify-center rounded-3xl bg-gray-50/20 gap-2 border border-white/70 text-white p-6 gap-6">
        <div>
          <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
        </div>
      <div>
        <Image
          alt="Image Here."
          src={url}
          width={300}
          height={200}
          className="rounded-2xl shadow-xl"
        />
      </div>
      <div>
        <h1>{description}</h1>
        </div>
      </div>
    </div>
  );
}
