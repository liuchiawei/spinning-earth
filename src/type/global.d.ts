// global.d.ts
import React from "react";

/**
 * 以下示範的是針對 React 18+ (含未來 React 19) 以及 Next.js 13+ (假設未來 15 也相容)
 * 所採用的新版 JSX 自動轉譯方式 (Automatic JSX Runtime)。
 * 若你要在舊版 React 17 或更早版本使用，需將 namespace 名稱從 React.JSX 改為 JSX。
 */

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      /**
       * 先保留所有原生 HTML Tag + r3f 之類的自定義 Tag
       * 實務上更精細的型別可使用 Partial<T> 或直接擴充
       */
      [elemName: string]: any;

      /**
       * 假設你想在 JSX 中使用 <my-element>，且自定義一些屬性
       */
      Tag: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // 自定義屬性
        translateX?: number | string;
        translateY?: number | string;
        translateZ?: number | string;
        rotateX?: number | string;
        rotateY?: number | string;
        rotateZ?: number | string;
      };
    }
  }
}

export {};
