import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NextPageBtn({
  nextCompanyId,
  prevCompanyId,
}: {
  nextCompanyId: number;
  prevCompanyId: number;
}) {
  return (
    <div className="w-full h-40 flex justify-between items-center p-4 gap-4">
      <Button asChild variant="ghost" className="w-full h-full">
        <Link
          href={`/company/${prevCompanyId}`}
          className="w-40 h-40 rounded-full border *:size-64"
        >
          <ChevronLeft />
        </Link>
      </Button>
      {/* <div className="h-full border" /> */}
      <Button asChild variant="ghost" className="w-full h-full">
        <Link
          href={`/company/${nextCompanyId}`}
          className="size-30 rounded-full border"
        >
          <ChevronRight />
        </Link>
      </Button>
    </div>
  );
}
