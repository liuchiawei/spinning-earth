import { useState, useEffect } from "react";

// set breakpoint to 768px (tailwind css -sm: breakpoint)
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // ページが最初に表示された時の判定
    handleResize();

    // リサイズイベントを登録
    window.addEventListener("resize", handleResize);

    // クリーンアップ関数でリスナーを解除
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
