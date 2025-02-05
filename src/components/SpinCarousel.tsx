"use client";

import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
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
import Earth from "./Earth";
import { ListProps } from "@/lib/props";
import { useMobile } from "@/hook/useMobile";

export default function SpinCarousel({
  db,
  selectedCardId,
  setSelectedCardId,
}: {
  db: ListProps[];
  selectedCardId: number | null;
  setSelectedCardId: (id: number | null) => void;
}) {
  const isMobile = useMobile();
  // orbit中に他のイベントリスナーを停止する
  const [isOrbiting, setIsOrbiting] = useState(false);
  const handleStart = () => setIsOrbiting(true);
  const handleEnd = () => setIsOrbiting(false);

  const [hoveredCardLocation, sethoveredCardLocation] = useState<string | null>(
    null
  );
  const handleCardHovered = (location: string | null) =>
    sethoveredCardLocation(location);

  const initialRotation = useMemo(() => new THREE.Euler(0.2, 0, 0.15), []);

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
          selectedCardId={selectedCardId}
          rotation={initialRotation}
          position={new THREE.Vector3(0, -0.4, 0)}
          hoveredCardLocation={hoveredCardLocation}
          handleCardHovered={handleCardHovered}
        >
          <Carousel
            db={db}
            radius={isMobile ? 2.2 : 3.2}
            count={db.length}
            isOrbiting={isOrbiting}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            hoveredCardLocation={hoveredCardLocation}
            handleCardHovered={handleCardHovered}
          />
          <Earth companies={db} selectedCardId={selectedCardId} />
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

type RigProps = {
  children: React.ReactNode;
  rotation: THREE.Euler;
  position: THREE.Vector3;
  hoveredCardLocation: string | null;
  selectedCardId: number | null;
  handleCardHovered: (location: string) => void;
};

const Rig: React.FC<RigProps> = ({
  children,
  rotation,
  position,
  hoveredCardLocation,
  selectedCardId,
  handleCardHovered,
}) => {
  const ref = useRef<THREE.Group>(null);

  // 初始時將群組的旋轉角度設為傳入的 rotation
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.copy(rotation);
    }
  }, [rotation]);

  useFrame((state, delta) => {
    // 選択されているカードがある場合は回転を停止
    if (!ref.current) return;

    // 當 selectedCardId 為 null 時，代表沒有暫停，否則暫停中
    const isPaused = selectedCardId !== null;

    // 如果目前不在暫停狀態，就持續根據 delta 時間更新旋轉角度
    if (!isPaused) {
      ref.current.rotation.y += delta / 10;
    }

    if (state.events.update) {
      state.events.update(); // ポインター移動ではなく毎フレームレイキャスト
    }
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
};

function Carousel({
  db,
  radius,
  count,
  isOrbiting,
  selectedCardId,
  setSelectedCardId,
  hoveredCardLocation,
  handleCardHovered,
}: {
  db: ListProps[];
  radius: number;
  count: number;
  isOrbiting: boolean;
  selectedCardId: number | null;
  setSelectedCardId: (id: number | null) => void;
  hoveredCardLocation: string | null;
  handleCardHovered: (location: string | null) => void;
}) {
  return db.map((item) => (
    <Card
      id={item.id}
      key={item.id}
      url={item.url}
      name={item.name}
      location={item.location}
      description={item.description}
      isOrbiting={isOrbiting}
      isSelected={selectedCardId === item.id}
      setSelectedCardId={setSelectedCardId}
      hoveredCardLocation={hoveredCardLocation}
      handleCardHovered={handleCardHovered}
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
  name,
  location,
  description,
  position,
  rotation,
  isOrbiting,
  isSelected,
  setSelectedCardId,
  hoveredCardLocation,
  handleCardHovered,
  ...props
}: {
  id: number;
  url: string;
  name: string;
  location: string;
  description: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  isOrbiting: boolean;
  isSelected: boolean;
  setSelectedCardId: (id: number | null) => void;
  hoveredCardLocation: string | null;
  handleCardHovered: (location: string | null) => void;
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
        e.stopPropagation();
        handleCardHovered(location);
        setHovered(true);
      }}
      onPointerOut={(e) => {
        if (isOrbiting) return;
        e.stopPropagation();
        handleCardHovered(null);
        setHovered(false);
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
            {name}
          </Text>
        </Billboard>
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
