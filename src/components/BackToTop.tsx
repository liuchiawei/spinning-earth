"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // height of the Button to show: 852px( iPhone 14 Pro )
      if (window.scrollY > 852) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`${
              isVisible ? "translate-y-0" : "translate-y-30"
            } fixed bottom-8 right-8 cursor-pointer transition-all duration-300 z-50`}
            onClick={handleClick}
            variant="default"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ページトップへ戻る</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
