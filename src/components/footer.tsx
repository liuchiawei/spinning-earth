export default function Footer({ name }: { name: string }) {
  return (
    <footer className="text-center bg-linear-to-b from-accent to-amber-500 text-white py-12 flex flex-col justify-center items-center gap-6">
      <p className="text-sm text-justify opacity-50 w-full max-w-[600px]">
        本サイトの時価総額データは主に https://hk.investing.com/
        から引用しており、OpenAI、ByteDance、SpaceX等の非上場企業の評価額については、各種メディア報道を総合的に参考にしております。
      </p>
      © {new Date().getFullYear()} {name} <br /> All rights reserved
    </footer>
  );
}
