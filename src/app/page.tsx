import Main from "@/app/Main";

export default function App() {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="absolute top-8 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0 gap-2 flex flex-col justify-center items-center md:items-start z-10 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold text-white">
          世界を揺るがす企業
        </h1>
        <h2 className="text-md md:text-xl text-gray-100">
          未来を創る、今ここに。
        </h2>
      </div>
      <div className="absolute bottom-8 left-8 z-10 text-sm md:text-xl text-gray-100">
        <h3>ドラッグして画面を回転</h3>
        <h3>スクロールして画面を拡大</h3>
      </div>
      <Main />
    </div>
  );
}
