import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NextPageBtn({
  nextCompanyId,
  nextCompanyName,
  prevCompanyId,
  prevCompanyName,
}: {
  nextCompanyId: number;
  nextCompanyName?: string;
  prevCompanyId: number;
  prevCompanyName?: string;

}) {
  return (
    <div className="w-full h-20 flex justify-between items-center p-4 gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" className="w-full h-full">
              <Link
                href={`/company/${prevCompanyId}`}
                className="w-40 h-40 rounded-full border *:size-64"
              >
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{prevCompanyName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" className="w-full h-full">
              <Link
                href={`/company/${nextCompanyId}`}
                className="size-30 rounded-full border"
              >
                <ChevronRight />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{nextCompanyName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
