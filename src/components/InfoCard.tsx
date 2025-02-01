import Image from "next/image";
import { cn } from "@/lib/utils";
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
    <div className="absolute z-50 bg-black/50 w-full h-full left-0 top-0">
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-3xl bg-gray-50/20 gap-2 border border-white/70 text-white p-6 gap-6 top-1/2 -translate-y-1/2 absolute",
          isMobile
            ? "w-[297px] h-[420px] left-1/2 -translate-x-1/2 "
            : "w-[420px] h-[594px] right-8"
        )}
      >
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
