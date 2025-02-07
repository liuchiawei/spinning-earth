import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hook/useMobile";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function InfoCard({
  id,
  name,
  description,
  url,
  selectedCardId,
  setSelectedCardId,
}: {
  id: number;
  name: string;
  description: string;
  url: string;
  selectedCardId: number | null;
  setSelectedCardId: (id: number | null) => void;
}) {
  const isMobile = useMobile();
  const handleClose = () => {
    if (selectedCardId) {
      setSelectedCardId(null);
    }
  };
  // カードアニメーション
  const variants = {
    hidden: { x: "100vw", rotate: 30 },
    visible: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
      },
    },
  };
  return (
    <div className="absolute z-50 bg-black/70 w-full h-full left-0 top-0 cursor-default">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        className={cn(
          "flex flex-col items-center justify-between rounded-3xl bg-gray-50/20 backdrop-blur-sm gap-2 border border-white/70 text-white p-8 gap-6 top-1/2 -translate-y-1/2 absolute",
          isMobile
            ? "w-4/5 h-4/5 left-1/2 -translate-x-1/2 "
            : "w-[420px] h-[594px] right-8"
        )}
      >
        <Button
          className="absolute top-3 left-3 z-10 text-xl text-slate-100 rounded-full w-8 h-8 cursor-pointer bg-black/50 hover:bg-accent"
          onClick={handleClose}
        >
          <X />
        </Button>
        <div>
          <h1 className="text-2xl md:text-5xl font-bold">{name}</h1>
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
        <div>
          <Button className="rounded-full px-4 py-2 cursor-pointer bg-black/50 hover:bg-accent text-slate-100">
            <Link href={`/company/${id}`}>もっと見る</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
