import Main from "@/app/Main";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import KatakanaTitle from "@/components/KatakanaTitle";
import { RandomizedTextEffect } from "@/components/KatakanaTitleNew";

export default function App() {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      <div className="absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 gap-2 flex flex-col justify-center items-center md:items-start z-10 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold text-white">
          世界を揺るがす企業
        </h1>
        <RandomizedTextEffect
          text="未来を創る、今ここに。"
          className="text-md md:text-xl text-gray-100/50"
        />
      </div>
      <div className="absolute bottom-1/6 md:bottom-8 left-8 z-10 text-sm md:text-xl *:text-sm text-gray-100 p-6 rounded-xl bg-slate-500/20">
        <h3>ドラッグして画面を回転</h3>
        <h3>スクロールして画面を拡大</h3>
      </div>
      <div className="absolute bottom-8 right-8 z-10 text-sm text-gray-100/70 text-center flex gap-2 items-end">
        by{}
        <SiteLink />
      </div>
      <Main />
    </div>
  );
}

const SiteLink = () => {
  return (
    <div className="flex flex-col transition-all">
      <h4 className="opacity-50">リュウ チャーウェイ</h4>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <a
              href="https://liuchiawei.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-2xl hover:text-white border-b border-white/30 hover:border-white"
            >
              Liu Chiawei
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>ポートフォリオサイト</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
