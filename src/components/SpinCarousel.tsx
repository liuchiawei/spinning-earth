"use client";

import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Image,
  useCursor,
  Billboard,
  Text,
  OrbitControls,
  Environment,
  Loader,
} from "@react-three/drei";
import { easing } from "maath";
import { BentPlane } from "./util";
import InfoCard from "./InfoCard";
import Earth from "./Earth";
import { useMobile } from "@/hook/useMobile";

const db: {
  id: number;
  title: string;
  description: string;
  url: string;
}[] = [
  {
    id: 1,
    title: "Apple",
    description:
      "直感的なデバイスとエコシステムを提供し、デジタルライフをシンプルかつ快適に。スマートフォンの普及を主導。",
    url: "/img1_.jpg",
  },
  {
    id: 2,
    title: "Alphabet",
    description:
      "検索・広告・クラウド技術を通じて情報アクセスを変革。AIや自動運転技術の発展にも貢献し、日常生活やビジネスの形を再定義。",
    url: "/img2_.jpg",
  },
  {
    id: 3,
    title: "Microsoft",
    description:
      "OS、クラウド、AIを通じてビジネスと個人の生産性を向上。企業や開発者向けツールの提供により、業務のデジタル化を加速。",
    url: "/img3_.jpg",
  },
  {
    id: 4,
    title: "Open AI",
    description:
      "AIの進化を牽引し、自然言語処理や創造的作業の自動化を推進。人々の働き方や情報取得の方法に革新をもたらす。",
    url: "/img4_.jpg",
  },
  {
    id: 5,
    title: "Amazon",
    description:
      "ECとクラウドサービスを発展させ、購買行動や物流を効率化。AI活用により、パーソナライズ化された消費体験を提供。",
    url: "/img5_.jpg",
  },
  {
    id: 6,
    title: "Meta",
    description:
      "SNSとメタバース技術を活用し、デジタル上の交流や経済活動を拡張。VR・ARの普及を加速し、次世代コミュニケーションを創出。",
    url: "/img6_.jpg",
  },
  {
    id: 7,
    title: "Tesla",
    description:
      "電気自動車の普及を加速し、持続可能なエネルギー社会の実現を推進。人々の移動手段やエネルギー利用の在り方を変革。",
    url: "/img7_.jpg",
  },
  {
    id: 8,
    title: "Nvidia",
    description:
      "GPU技術を進化させ、AI、ゲーム、データ処理の性能を飛躍的に向上。ディープラーニングや自動運転技術の発展を支える。",
    url: "/img8_.jpg",
  },
  {
    id: 9,
    title: "Byte Dance",
    description:
      "短尺動画プラットフォームを通じてコンテンツ消費を変革。AIによるレコメンド技術で、人々の情報取得やエンタメの嗜好を変える。",
    url: "/img9_.jpg",
  },
  {
    id: 10,
    title: "Space X",
    description:
      "宇宙開発のコストを劇的に削減し、民間宇宙事業を拡大。火星移住計画を推進し、宇宙旅行の新たな可能性を開く。",
    url: "/img10_.jpg",
  },
];

export default function SpinCarousel() {
  const isMobile = useMobile();
  // orbit中に他のイベントリスナーを停止する
  const [isOrbiting, setIsOrbiting] = useState(false);
  const handleStart = () => setIsOrbiting(true);
  const handleEnd = () => setIsOrbiting(false);

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="touch-none">
        <OrbitControls
          onStart={handleStart}
          onEnd={handleEnd}
          enableZoom={true} // ズームの有効化/無効化
          minAzimuthAngle={-Infinity} // 水平回転の最小角度を許可
          maxAzimuthAngle={Infinity} // 水平回転の最大角度を許可
          minPolarAngle={0} // 垂直回転の最小角度を許可
          maxPolarAngle={Math.PI} // 垂直回転の最大角度を許可
        />
        <directionalLight position={[4, 1, 0]} intensity={5} />
        {/* 自転軸の中心角度を制御：x:カメラ上下 y:無関係（円形のため） z:カメラ左右 */}
        <Rig
          rotation={new THREE.Euler(0.2, 0, 0.15)}
          position={new THREE.Vector3(0, -0.4, 0)}
        >
          <Carousel
            radius={isMobile ? 2.2 : 3.2}
            count={db.length}
            isOrbiting={isOrbiting}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
          <Earth />
        </Rig>
        <Environment
          preset="dawn" // 背景のプリセット画像
          background={true} // 背景の表示/非表示
          backgroundBlurriness={0.55} // 背景のぼかし具合
          backgroundIntensity={0.015} // 背景の明るさ
          backgroundRotation={[0.5, 0.8, 0.5]} // 背景の回転
        />
        {/* グローバルクリックハンドラーを追加 */}
        <GlobalClickHandler setSelectedCardId={setSelectedCardId} />
      </Canvas>
      {/* TODO: ローダースタイル */}
      <Loader
        barStyles={{ background: "#eeeeee", color: "#000" }}
        dataStyles={{ color: "red" }}
      />
    </>
  );
}

function Rig(props: {
  children: React.ReactNode;
  rotation: THREE.Euler;
  position: THREE.Vector3;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    // 時間に応じてy軸回転
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t / 10; // コンテンツを回転
    if (state.events.update) {
      state.events.update(); // ポインター移動ではなく毎フレームレイキャスト
    }
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
  radius,
  count,
  isOrbiting,
  selectedCardId,
  setSelectedCardId,
}: {
  radius: number;
  count: number;
  isOrbiting: boolean;
  selectedCardId: number | null;
  setSelectedCardId: (id: number | null) => void;
}) {
  return db.map((item) => (
    <Card
      id={item.id}
      key={item.id}
      url={item.url}
      title={item.title}
      description={item.description}
      isOrbiting={isOrbiting}
      isSelected={selectedCardId === item.id}
      setSelectedCardId={setSelectedCardId}
      position={
        new THREE.Vector3(
          Math.sin((item.id / count) * Math.PI * 2) * radius,
          0,
          Math.cos((item.id / count) * Math.PI * 2) * radius
        )
      }
      rotation={
        new THREE.Euler(0, Math.PI + (item.id / count) * Math.PI * 2, 0)
      }
    />
  ));
}

function Card({
  id,
  url,
  title,
  description,
  position,
  rotation,
  isOrbiting,
  isSelected,
  setSelectedCardId,
  ...props
}: {
  id: number;
  url: string;
  title: string;
  description: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  isOrbiting: boolean;
  isSelected: boolean;
  setSelectedCardId: (id: number | null) => void;
  children?: React.ReactNode | undefined;
}) {
  const ref = useRef<THREE.Mesh>(null);
  // ホバー時にポインタを「ポインター」に変更し、ホバー終了時にポインタを元に戻す
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, "pointer", "auto");

  useFrame((state, delta) => {
    if (!ref.current) return;
    // 外側のコンテナ Image Container
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    // コンテナのボーダー半径
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.1 : 0.1,
      0.2,
      delta
    );
    // 内側の画像 Image 2: 1(ズーム倍率 scale), 0.2(アニメーション秒数 duration), delta
    easing.damp(ref.current.material, "zoom", hovered ? 1.3 : 1, 0.2, delta);
  });

  // クリック時に infoCard を表示
  const handleDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // イベントの伝播を停止し、グローバルクリックで閉じるのを防ぐ
    setSelectedCardId(isSelected ? null : id);
  };

  return (
    <group
      position={position}
      rotation={rotation}
      {...props}
      onPointerOver={(e) => {
        if (isOrbiting || isSelected) return;
        if (!isOrbiting) {
          e.stopPropagation();
          setHovered(true);
        }
      }}
      onPointerOut={(e) => {
        if (isOrbiting) return;
        if (!isOrbiting) {
          e.stopPropagation();
          setHovered(false);
        }
      }}
    >
      <Image
        name="card-image" // クリックイベントを識別するために使用
        alt="image"
        ref={ref}
        url={url}
        transparent
        side={THREE.DoubleSide}
        onClick={handleDialog}
      >
        {/* 画像の曲率 曲率/x軸長さ/y軸長さ/多角形水平方向面数/垂直方向面数 */}
        <BentPlane args={[0.08, 1, 1, 18, 1]} />
      </Image>
      {(hovered || isSelected) && (
        <Billboard position={[0, 0.8, 0.1]}>
          <Text fontSize={0.1} anchorX="center" anchorY="middle">
            {title}
          </Text>
        </Billboard>
      )}
      {isSelected && (
        <InfoCard title={title} description={description} url={url} />
      )}
    </group>
  );
}

/**
 * GlobalClickHandler コンポーネントは Canvas 内でのグローバルクリックイベントを処理します。
 * ユーザーが Canvas をクリックしたがカードをクリックしていない場合、すべての InfoCard を閉じます。
 */
function GlobalClickHandler({
  setSelectedCardId,
}: {
  setSelectedCardId: (id: number | null) => void;
}) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Canvas の境界を取得
      const rect = gl.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // クリック位置を NDC (Normalized Device Coordinates) に変換
      const pointer = new THREE.Vector2(
        (x / rect.width) * 2 - 1,
        -(y / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      // 「card-image」という名前のオブジェクトのいずれかがクリックされたかどうかを判断
      const clickedOnImage = intersects.some(
        (intersect) => intersect.object.name === "card-image"
      );

      // クリック位置がどのカードでもない場合、すべての InfoCard を閉じる
      if (!clickedOnImage) {
        setSelectedCardId(null);
      }
    };

    // クリックイベントリスナーを追加
    gl.domElement.addEventListener("click", handleClick);
    return () => {
      // イベントリスナーをクリーンアップ
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, scene, camera, setSelectedCardId]);

  return null; // このコンポーネントは何もレンダリングしません
}
